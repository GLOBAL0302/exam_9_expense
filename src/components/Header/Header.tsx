import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box margin={10}>
      <AppBar >
        <Toolbar>
          <Typography variant="h6" component="h6">
            Finance Tracker
          </Typography>
          <Button sx={{marginLeft:"auto", marginRight:5}} variant='contained' color='success'>
            <NavLink to="/categories">
              Categories
            </NavLink>
          </Button>
          <Button variant='contained' color='warning'>
            Add
          </Button>
        </Toolbar>
      </AppBar>

    </Box>
  );
};

export default Header;