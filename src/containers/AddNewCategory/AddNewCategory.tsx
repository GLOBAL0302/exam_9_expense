import CategoriesAll from '../../components/AllCategories/CategoriesAll.tsx';
import { useState } from 'react';
import { Button, Grid2, Typography } from '@mui/material';
import ModalWindow from '../../components/ModalWindow/ModalWindow.tsx';
import CategoriesForm from '../../components/CategoriesForm/CategoriesForm.tsx';

const AddNewCategory = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openCloseModal = () => {
    setModalOpen((prevState) => !prevState);
  };
  return (
    <>
      <Grid2 container>
        <Typography variant="h4" component="h4" color="inherit">
          Categories
        </Typography>
        <Button onClick={() => openCloseModal()} sx={{ marginLeft: 'auto' }} variant="outlined" color="primary">
          Add Category
        </Button>
        <ModalWindow modal={modalOpen} changeModalStatus={() => openCloseModal()}>
          <CategoriesForm changeModalStatus = {openCloseModal}/>
        </ModalWindow>
      </Grid2>
      <CategoriesAll/>
    </>
  );
};

export default AddNewCategory;