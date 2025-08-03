import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { menuInfoCard } from './menuInfoType';

interface MenuInfoState {
    menuInfo : menuInfoCard | null;
    loading: boolean;
    error: string | null;
}
const initialState :MenuInfoState = {
    menuInfo : {
        Id : "",
        Name : "",
        Address: null,
        WorkHour : null,
        PhoneNumber : null,
        SiteDescription : null,
        SocialMedia : null,
        Logo : null
    },
    loading : false,
    error : null,
}

const menuInfoCardSlice = createSlice({
    name : "menuInfoCard",
    initialState,
    reducers : {
        setMenuInfoCard(state , action : PayloadAction<menuInfoCard>){
            state.menuInfo = action.payload,
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
export const {setMenuInfoCard , setLoading, setErorr} = menuInfoCardSlice.actions;
export default menuInfoCardSlice.reducer;