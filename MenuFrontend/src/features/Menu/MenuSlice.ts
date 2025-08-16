import { createSlice, type PayloadAction } from "@reduxjs/toolkit"; 
import type { GetMenuMainCategories , GetMenuCategories , GetMenuProducts , GetMenuInformation } from "./MenuTypes";


type orderOption = {
    item : GetMenuProducts,
    count : number,
}

interface MenuState {
    mainCategories : GetMenuMainCategories[],
    categories : GetMenuCategories[],
    products : GetMenuProducts[],
    menuInformation : GetMenuInformation,
    orders : orderOption[],
    liked : GetMenuProducts[]
}
const initialState : MenuState = {
    mainCategories : [],
    categories : [],
    products : [],
    menuInformation : {
        id : "",
        name: "",
        address : "",
        workHour : "",
        phoneNumber : "",
        siteDescription : "",
        socialMedia : "",
        logo : ""
    },
    orders : [],
    liked : []
}

const MenuSlice = createSlice({
    name : 'menu',
    initialState,
    reducers : {
        getMainCategories : (state,action: PayloadAction<GetMenuMainCategories[]>) => {
            state.mainCategories = action.payload
        },
        getCategories : (state,action: PayloadAction<GetMenuCategories[]>) => {
            state.categories = action.payload
        },
        getProducts : (state,action: PayloadAction<GetMenuProducts[]>) =>{
            state.products = action.payload
        },
        getMenuInformation : (state,action: PayloadAction<GetMenuInformation>) =>{
            state.menuInformation.id = action.payload.id
            state.menuInformation.name = action.payload.name
            state.menuInformation.address = action.payload.address
            state.menuInformation.workHour = action.payload.workHour
            state.menuInformation.phoneNumber = action.payload.phoneNumber
            state.menuInformation.siteDescription = action.payload.siteDescription
            state.menuInformation.socialMedia = action.payload.socialMedia
            state.menuInformation.logo = action.payload.logo
        },
        addOrders : (state , action : PayloadAction<GetMenuProducts>) => {
             if (!action.payload || !action.payload.id) return;
            const index = state.orders.findIndex(o => o.item.id === action.payload.id);

            if (index !== -1) {
                state.orders[index].count += 1;
            } else {
                state.orders.push({
                    item: action.payload,
                    count: 1
                });
            }
        },
        removeOrders : (state , action : PayloadAction<GetMenuProducts>) => {
            const index = state.orders.findIndex(o => o.item.id === action.payload.id);

            if(state.orders[index].count == 1){
                state.orders = state.orders.filter(o => o.item.id !== action.payload.id)
            }
            else{
                state.orders[index].count -= 1
            }
        },
        addLikedProducts : (state , action : PayloadAction<GetMenuProducts>) => {
            state.liked.push(action.payload)

        },
        removeLikedProducts : (state , action) =>{
            state.liked = state.liked.filter(l => l.id !== action.payload)
        }
    }
})

export const {
    getMainCategories ,
    getCategories , 
    getProducts , 
    getMenuInformation , 
    addOrders , 
    addLikedProducts,
    removeLikedProducts,
    removeOrders
} = MenuSlice.actions;
export default MenuSlice.reducer;