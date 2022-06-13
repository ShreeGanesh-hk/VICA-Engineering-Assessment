import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Login {
    loggedIn: boolean,
    user:string,
    role:number,
}

const initialState = {
    loggedIn: false,
    user:"",
    role:-1,
} as Login

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin : (state, action: PayloadAction<Login>) =>{
            state.loggedIn = action.payload.loggedIn
            state.role = action.payload.role
            state.user = action.payload.user
    }
}
})

export const {setLogin} = LoginSlice.actions
export default LoginSlice.reducer
