import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Link, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useAppDispatch } from '../data-manage/hooks';
import { Login, setLogin } from '../data-manage/features/login';
import { useNavigate } from 'react-router-dom';

export default function MainAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    let user = {
      loggedIn: false,
      user: "",
      role: -1,
    } as Login
    dispatch(setLogin(user));
    navigate('/');
  }


  return (
    <Box>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Book Management
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Link component="a" variant="button" href='/users' underline='hover'>Manage User</Link>
              </MenuItem>
              <MenuItem>
                <Link component="a" variant="button" href='/books' underline='hover'>Manage Book</Link>
              </MenuItem>
              <MenuItem><Link component="a" variant="button" href='/analytics' underline='hover'>View Analytics</Link></MenuItem>
              <MenuItem><Link component="a" variant="button" onClick={handleLogout} underline='hover'>Logout</Link></MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
