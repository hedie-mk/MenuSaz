import { createSlice , type PayloadAction } from "@reduxjs/toolkit";
import type { inactiveProduct } from "./inactiveProductsTypes";

interface inactiveProductState {
    data : inactiveProduct[],
    isLoading : boolean,
    error : string | null,
}
const initialState : inactiveProductState= {
    data : [],
    isLoading : false,
    error : null,
}

const inactiveProductCardSlice = createSlice({
    name : 'inactiveProductCard',
    initialState,
    reducers : {
        setInactiveProduct(state , action : PayloadAction<inactiveProduct[]>){
            state.data = action.payload,
            state.isLoading = false,
            state.error = null
        },
        setLoading(state , action : PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        setErorr(state , action : PayloadAction<string | null>){
            state.error = action.payload
        },
    }
});

export const {setInactiveProduct , setLoading , setErorr} = inactiveProductCardSlice.actions;
export default inactiveProductCardSlice.reducer;