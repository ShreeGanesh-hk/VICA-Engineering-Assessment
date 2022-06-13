import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react'
import { addBook, setBookDialog, setBookErrorMessage, setSelectedBookId, updateBook } from '../data-manage/features/books';
import { useAppDispatch, useAppSelector } from '../data-manage/hooks';
import { Book, EmptyBook } from '../data-manage/model/book-model';
import { InputChangeEventHandler } from '../utils/eventTypes';

const formError = {
    title: {
        error: false,
        message: ""
    },
    author: {
        error: false,
        message: ""
    },
    published: {
        error: false,
        message: ""
    },
    genre: {
        error: false,
        message: ""
    }
}


function BookDialog() {
    const { showBookDialogue, selectedBookId, books } = useAppSelector((state => state.bookManagement));
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [formInput, setFormInput] = useState<Book>(EmptyBook);
    const [error, setError] = useState(formError);
    useEffect(() => {
        setError(formError);
    }, [])

    useEffect(() => {
        if (selectedBookId > 0) {
            const book = books.find((book) => (book.id === selectedBookId))
            if (book !== undefined) {
                setTitle("Update Book");
                setFormInput(book);
            }
        }
        else {
            setFormInput(EmptyBook);
            setTitle("Add New Book");

        }

    }, [selectedBookId, books]);

    const handleCancel = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(formError);
        setFormInput(EmptyBook);
        dispatch(setBookDialog(false));
        dispatch(setSelectedBookId(0));
    }

    const handleSave = (book: Book) => {
        if (book.id > 0) {
            dispatch(updateBook(book));
        }
        else if (book.id === 0) {
            book.id = Math.max(...books.map((book) => book.id), 0) + 1;
            dispatch(addBook(book));
        }
        else {
            dispatch(setBookErrorMessage("Something went wrong while adding/updating book"));
        }
    }

    const handleChange: InputChangeEventHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormInput({ ...formInput, [name]: value });
    }

    const validate = () => {
        let validationError = cloneDeep(formError);
        let isError = false;
        let k: keyof typeof formInput;
        for (k in formInput) {
            const value = formInput[k];
            if (k === "published") {
                if (value.toString().length < 4) {
                    isError = true;
                    validationError[k].error = true;
                    validationError[k].message = "Plese enter correct published year";
                }
            }
            else if (typeof value === "string" && k !== "borrower" && k !== "id") {
                if (value === "") {
                    isError = true
                    validationError[k].error = true;
                    validationError[k].message = `Plese enter valid ${k}`;
                }
            }
        }

        if (isError) {
            setError(validationError);
            return
        }
        else {
            handleSave({ ...formInput } as Book);
        }
    }

    return (
        <div>
            <Dialog open={showBookDialogue} onClose={() => { handleCancel() }} maxWidth="md">
                <Box component="div" sx={{ maxWidth: '100%' }}   >
                    <DialogTitle variant='h5'>{title}</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            <Grid item xs={6} md={6}>
                                <TextField
                                    fullWidth={true}
                                    name='title'
                                    error={error.title && error.title.error}
                                    value={formInput.title}
                                    onChange={handleChange}
                                    required
                                    id="outlined-required"
                                    label="Enter Title"
                                    helperText={error.title.message}
                                />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    fullWidth={true}
                                    name='author'
                                    error={error.author && error.author.error}
                                    value={formInput.author}
                                    onChange={handleChange}
                                    required
                                    id="outlined-required"
                                    label="Enter Author"
                                    helperText={error.author.message}
                                />
                            </Grid>

                            <Grid item xs={6} md={6}>
                                <TextField
                                    fullWidth={true}
                                    name='published'
                                    error={error.published && error.published.error}
                                    value={formInput.published}
                                    onChange={handleChange}
                                    required
                                    id="outlined-required"
                                    label="Enter Published Year"
                                    helperText={error.published.message}
                                />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    fullWidth={true}
                                    name='genre'
                                    error={error.genre && error.genre.error}
                                    value={formInput.genre}
                                    onChange={handleChange}
                                    required
                                    id="outlined-required"
                                    label="Enter Genre"
                                    helperText={error.genre.message}
                                />
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant="contained" onClick={() => { handleCancel() }}>Cancel</Button>
                        <Button variant="contained" onClick={() => { validate() }}  >Save</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div >
    )
}

export default BookDialog