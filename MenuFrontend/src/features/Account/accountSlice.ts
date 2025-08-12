import { createSlice, type PayloadAction } from "@reduxjs/toolkit"; 
import type { GetAccount } from "./accountType";


interface AccountState {
    userName : string,
    role : string
}
const initialState:AccountState  = {
    userName: "",
    role : "",
}
const accountSlice = createSlice({
    name : "account",
    initialState,
    reducers : {
        getAccount : (state , action : PayloadAction<GetAccount>) => {
            state.userName = action.payload.userName;
            state.role = action.payload.role
        }
    }
});
export const {getAccount} = accountSlice.actions;
export default accountSlice.reducer;