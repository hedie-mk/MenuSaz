import { createSlice , type PayloadAction } from "@reduxjs/toolkit";
import type { inactiveCategory } from "./inactiveCategoriesTypes";

interface inactiveCategoriesState {
    data : inactiveCategory[],
    isLoading : boolean,
    error : string | null,
}
const initialState : inactiveCategoriesState= {
    data : [],
    isLoading : false,
    error : null,
}

const inactiveCategoriesCardSlice = createSlice({
    name : 'inactiveCategoriesCard',
    initialState,
    reducers : {
        setInactiveCategories(state , action : PayloadAction<inactiveCategory[]>){
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

export const {setInactiveCategories , setLoading , setErorr} = inactiveCategoriesCardSlice.actions;
export default inactiveCategoriesCardSlice.reducer;