import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface LoadingState {
    loading: boolean
}

const initialState = {
    loading: false
} as LoadingState

const LoadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoadingIndicator : (state, action: PayloadAction<boolean>) =>{
            state.loading = action.payload
    }
}
})

export const {setLoadingIndicator} = LoadingSlice.actions
export default LoadingSlice.reducer
