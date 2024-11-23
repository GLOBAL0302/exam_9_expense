import { Button, Grid2, Typography } from '@mui/material';
import ModalWindow from '../../components/ModalWindow/ModalWindow.tsx';
import CategoriesForm from '../../components/CategoriesForm/CategoriesForm.tsx';
import CategoriesAll from '../../components/AllCategories/CategoriesAll.tsx';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  fetchAllCategories,
  fetchOneCategoryById,
  updateCategoryById,
} from '../../components/AllCategories/categoriesThunk.ts';
import { selectFetchCategoryLoading, selectOneCategory } from '../../components/AllCategories/categoriesSlice.ts';
import { ICategoryForm } from '../../types';

interface Props {
  modal:boolean
}

const EditOldCategory:React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const fetchloading = useAppSelector(selectFetchCategoryLoading);
  const oneCategory = useAppSelector(selectOneCategory);
  const [modalOpen, setModalOpen] = useState(false);
  const {id} = useParams();

  const openCloseModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  const fetchOneCategory = useCallback(async ()=>{
    if(id)
      await dispatch(fetchOneCategoryById(id));
  },[id]);

  const updateCategory = async(category:ICategoryForm)=>{
    if(id){
      await dispatch(updateCategoryById({categoryId:id, newCategory:category}))
      await dispatch(fetchAllCategories())
    }
  }

  useEffect(() => {
    void fetchOneCategory()
  }, [fetchOneCategory]);

  return (
    <>
      <Grid2 container>
        <Typography variant="h4" component="h4" color="inherit">
          Categories
        </Typography>
        <Button onClick={() => openCloseModal()} sx={{ marginLeft: 'auto' }} variant="outlined" color="primary">
          Add Category
        </Button>
        {fetchloading? '': <ModalWindow modal={modalOpen} changeModalStatus={() => openCloseModal()}>
          <CategoriesForm
            edit
            changeModalStatus = {openCloseModal}
            oneCategory={oneCategory}
            updateCategory={(category)=>updateCategory(category)}/>
        </ModalWindow>}
      </Grid2>
      <CategoriesAll openCloseModal={openCloseModal}/>
    </>
  );
};

export default EditOldCategory;