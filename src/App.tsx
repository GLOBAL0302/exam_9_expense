import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import { Container } from '@mui/material';
import HomeContainer from './containers/HomeContainer/HomeContainer.tsx';
import AddNewCategory from './containers/AddNewCategory/AddNewCategory.tsx';
import EditOldCategory from './containers/EditOldCategory/EditOldCategory.tsx';

const App = () => {

  return (
    <>
      <Header/>
      <Container>
        <Routes>
          <Route path="/" element={<HomeContainer/>}/>
          <Route path="/categories" element={<AddNewCategory/>}/>
          <Route path="/categories/:id" element={<EditOldCategory modal={true}/>}/>
        </Routes>
      </Container>
    </>
  )
};

export default App
