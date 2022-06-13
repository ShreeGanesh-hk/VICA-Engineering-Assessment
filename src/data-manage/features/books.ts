import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../model/book-model";


interface Books {
    books: Book[],
    showBookDialogue: boolean,
    selectedBookId: number,
    success: boolean,
    error: boolean,
    errorMessage: string

}

const initialState = {
    books: [],
    showBookDialogue: false,
    selectedBookId: 0,
    success: false,
    error: false,
    errorMessage: ""
} as Books;



export const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setAllBooks: (state, action: PayloadAction<Book[]>) => {
            state.books = action.payload
        },
        setBookDialog: (state, action: PayloadAction<boolean>) => {
            state.showBookDialogue = action.payload
        },
        setSelectedBookId: (state, action: PayloadAction<number>) => {
            state.selectedBookId = action.payload

        },
        addBook: (state, action: PayloadAction<Book>) => {
            state.books.push(action.payload);
            state.showBookDialogue = false;
            state.success = true;
        },
        deleteBook: (state, action: PayloadAction<number>) => {
            state.books = state.books.filter(data => data.id !== action.payload);
            state.success = true;

        },
        updateBook: (state, action: PayloadAction<Book>) => {
            const bookIndex = state.books.findIndex((book) => book.id === action.payload.id)
            state.books[bookIndex] = action.payload;
            state.showBookDialogue = false;
        },
        setBookErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.error = true;
        },
        resetBooksAlert: (state) => {
            state.success = false
            state.error = false
        },
    }
});

export const { addBook, updateBook, deleteBook, setAllBooks, setBookDialog, setSelectedBookId, setBookErrorMessage, resetBooksAlert } = bookSlice.actions;

export default bookSlice.reducer;