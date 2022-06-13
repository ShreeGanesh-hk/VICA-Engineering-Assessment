import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchJson } from "../services/requestUtil"
import { Constants } from "../utils/constants"
import { User } from "./model/user-model";

interface MyKnownError {
    errorMessage: string
}

export const fetchUsers = createAsyncThunk<User[], User, { rejectValue: MyKnownError }>(
    'users',
    // Declare the type your function argument here:
    async (user, thunkApi) => {
        const response = await fetchJson(Constants.FETCH_USER_URL);
        if (response.status === 400) {
            // Return the known error for future handling
            return thunkApi.rejectWithValue((await response.json()) as MyKnownError)
          }
          return (await response.json()) as User[]        
    }
)