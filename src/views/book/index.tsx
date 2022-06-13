import { Alert, AppBar, Button, Paper, Snackbar, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../data-manage/hooks'
import { resetBooksAlert, setBookDialog, setSelectedBookId } from '../../data-manage/features/books'
import AllBooks from './all-books'
import BookDialog from '../../components/bookdialog'

export default function BookManagement() {
  const dispatch = useAppDispatch();
  const { success, error, errorMessage } = useAppSelector((state) => state.bookManagement);

  const handleShowDialog = () => {
    dispatch(setSelectedBookId(0));
    dispatch(setBookDialog(true));
  }
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetBooksAlert());
  };  

  return (
    <div>
      <Box>
        <Paper>
          <AppBar position='relative' sx={{ backgroundColor: 'transparent', color: '#1976d2' }}>
            <Toolbar >
              <Typography variant='h6' sx={{ flexGrow: 1, textAlign: 'center' }}> Manage Books</Typography>
              <Button variant="contained" onClick={handleShowDialog}>Add Book</Button>
            </Toolbar>
          </AppBar>
          <AllBooks />
        </Paper>
      </Box>
      <BookDialog />
      <Snackbar open={success} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
          Task Completed successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div >
  )
}
