import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MenuStatusCard } from './menuStatusTypes';

interface menuStatusCardState {
    menu: MenuStatusCard[];
    loading: boolean;
    error: string | null;
}

const initialState:menuStatusCardState = {
    menu : [] ,
    loading:false,
    error : null
}

const menuStatusCardSlice = createSlice({
    name : 'menuStatusCard',
    initialState,
    reducers : {
        setMenuStatusCard(state , action : PayloadAction<MenuStatusCard[]>){
            state.menu = action.payload,
            state.loading = false,
            state.error = null
        },
        setLoading(state , action : PayloadAction<boolean>){
            state.loading = action.payload;
        },
        setErorr(state , action : PayloadAction<string | null>){
            state.error = action.payload;
        },
    }
});

export const { setMenuStatusCard , setLoading , setErorr} = menuStatusCardSlice.actions;
export default menuStatusCardSlice.reducer;