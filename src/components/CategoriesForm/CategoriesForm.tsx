import { Button, CircularProgress, Grid2, TextField } from '@mui/material';
import {FormEvent, useState } from 'react';
import {IncomeExpense} from "../../CONSTANTS.ts"
import { ICategoryForm } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchAllCategories, postCategory } from '../AllCategories/categoriesThunk.ts';
import { selectPostCategoriesLoading } from '../AllCategories/categoriesSlice.ts';


interface Props {
  changeModalStatus?:VoidFunction
  oneCategory?:ICategoryForm
  updateCategory?: (category: ICategoryForm) => void
  edit?:boolean
}

const initialState:ICategoryForm = {
  categoryType:"Income",
  categoryName:""
}

const CategoriesForm:React.FC<Props> = ({
                                          changeModalStatus,
                                          oneCategory=initialState,
                                          updateCategory,
                                          edit=false}) => {
  const dispatch = useAppDispatch();
  const selectPostLoading = useAppSelector(selectPostCategoriesLoading)
  const [categories, setCategoriesForm] = useState(oneCategory);
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
    setCategoriesForm((prevState)=>{
      return{
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const onSubmitForm = async (e:FormEvent)=>{
    e.preventDefault();
    if(edit){
      if (updateCategory) {
        updateCategory(categories);
      }
    }else{
      await dispatch(postCategory({...categories}))
    }
    await dispatch(fetchAllCategories());
    if(changeModalStatus){
      changeModalStatus();
    }
  }

  return (
    <Grid2
      onSubmit={onSubmitForm}
      container component="form" spacing={2}>
        <select
          required
          value={categories.categoryType}
          onChange={onChange}
          name="categoryType"
          id="categoryType"
          style={{ width: '100%', padding: '10px' , marginBottom:"5px"}}
        >
          <option disabled>Select Type</option>
          {IncomeExpense.map((item) => (
            <option key={item} value={item}>{item.toUpperCase()}</option>
          ))}
        </select>
        <TextField
          required
          fullWidth
          onChange={onChange}
          value={categories.categoryName}
          name='categoryName' id="categoryName" label="Type" variant="outlined" />
      <Button disabled={selectPostLoading} sx={{marginLeft:"auto"}} variant="outlined" type="submit" color="primary">
        {edit ? "Update": "Submit"}  {selectPostLoading? <CircularProgress/> : ""}
      </Button>
    </Grid2>
  );
};

export default CategoriesForm;