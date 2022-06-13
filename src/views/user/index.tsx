import { Alert, AppBar, Button, Paper, Snackbar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import UserDialog from '../../components/userdialog'
import AllUsers from './AllUsers'
import { User } from '../../data-manage/model/user-model';
import { addUser, resetAlert, setSelectedUserId, setUserDialogue, setUserErrorMessage, updateUser } from '../../data-manage/features/user'
import { useAppDispatch, useAppSelector } from '../../data-manage/hooks'

export default function UserManagement() {
  const dispatch = useAppDispatch();
  const userstate = useAppSelector((state) => state.userManagement);

  const handleShowDialog = () => {
    dispatch(setSelectedUserId(0));
    dispatch(setUserDialogue(true));
  }

  const handleCancelDialog = () => {
    dispatch(setUserDialogue(false));
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetAlert());
  };

  const saveUser = (name: string, role: number, id: number) => {
    if (id > 0) {
      const user = {
        id: id,
        name: name,
        role: role,
      } as User
      dispatch(updateUser(user));
    }
    else if (id === 0) {
      const user = {
        id: Number(userstate.users[userstate.users.length - 1].id) + 1,
        name: name,
        role: role,
      } as User
      dispatch(addUser(user));
    }
    else {
      dispatch(setUserErrorMessage("Something went wrong while adding/updating user"));
    }
  }

  return (
    <div>
      <Box>
        <Paper>
          <AppBar position='relative' sx={{ backgroundColor: 'transparent', color: '#1976d2' }}>
            <Toolbar >
              <Typography variant='h6' sx={{ flexGrow: 1, textAlign: 'center' }}> Manage Users</Typography>
              <Button variant="contained" onClick={handleShowDialog}>Add User</Button>
            </Toolbar>
          </AppBar>
          <AllUsers />
        </Paper>
      </Box>
      <UserDialog title="Add New User" handleCancel={handleCancelDialog} handleSave={saveUser} />
      <Snackbar open={userstate.success} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
          Task Completed successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={userstate.error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
          {userstate.errorMessage}
        </Alert>
      </Snackbar>
    </div >
  )
}
