import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../model/user-model";


interface Users {
    users: User[],
    showUserDialogue: boolean,
    selectedUserId: number,
    success: boolean,
    error: boolean,
    errorMessage: string

}

const initialState = {
    users: [],
    showUserDialogue: false,
    selectedUserId: 0,
    success: false,
    error: false,
    errorMessage: ""
} as Users;



export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setAllUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload            
        },
        setUserDialogue: (state, action: PayloadAction<boolean>) => {
            state.showUserDialogue = action.payload
        },
        setSelectedUserId: (state, action: PayloadAction<number>) => {
            state.selectedUserId = action.payload

        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
            state.showUserDialogue = false;
            state.success = true;
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(data => data.id !== action.payload);
            state.success = true;

        },
        updateUser: (state, action: PayloadAction<User>) => {
            const userIndex = state.users.findIndex((user) => user.id === action.payload.id)
            state.users[userIndex].name = action.payload.name;
            state.users[userIndex].role = action.payload.role;
            state.showUserDialogue = false;
        },
        setUserErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
            state.error = true;
        },
        resetAlert: (state) => {
            state.success = false
            state.error = false
        },
    }
});

export const { addUser, updateUser, deleteUser, setAllUsers, setUserDialogue, setSelectedUserId, setUserErrorMessage, resetAlert } = userSlice.actions;

export default userSlice.reducer;