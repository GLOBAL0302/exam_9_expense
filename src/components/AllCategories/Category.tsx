import { ICategoriesList } from '../../types';
import { Button, Grid2, Typography } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../app/hooks.ts';
import { deleteCategoryById } from './categoriesThunk.ts';
import { deleteCategory } from './categoriesSlice.ts';
import { NavLink } from 'react-router-dom';

interface Props{
  category:ICategoriesList
  openCloseModal?:VoidFunction
}

const Category:React.FC<Props> = ({category, openCloseModal}) => {
  const dispatch = useAppDispatch();
  const categoryTypeColor = category.categoryType === "Income"?"success": "error"

  const onClickDelete = async ()=>{
    await dispatch(deleteCategoryById(category));
    dispatch(deleteCategory(category));
  }

  return (
    <Grid2
      sx={{
        border:'2px solid black',
        padding: 2,
        borderRadius: '20px'
    }}
      container
      alignItems="center"
      spacing={2}>
      <Typography variant="h6"  component="h6">
        {category.categoryName}
      </Typography>
      <Typography marginLeft='auto' variant="body1" color={categoryTypeColor} component="p">
        {category.categoryType}
      </Typography>
      <Button
        onClick={openCloseModal}
        variant="contained" color="primary" startIcon={<BorderColorIcon/>}>
        <NavLink to={`/categories/${category.id}`}>
          Edit
        </NavLink>
      </Button>
      <Button onClick={onClickDelete} variant="contained" color="primary" startIcon={<DeleteIcon/>}>
        Delete
      </Button>
    </Grid2>
  );
};

export default Category;