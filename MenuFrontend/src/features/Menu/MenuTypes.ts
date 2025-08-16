export interface GetMenuMainCategories {
    id : string,
    name : string,
    state : string ,
}
export interface GetMenuCategories{
    id : string
    name : string
    state : string 
    parentCategoryId : string 
    parentCategoryName : string
}
export interface GetMenuProducts{
    id : string,
    name : string,
    price : number,
    discountedPrice : number | null,
    description : string | null,
    state : string,
    categoryName : string | null,
    categoryId : string | null,
    photo : string | null,    
}
export interface GetMenuInformation{
    id : string,
    name : string ,
    address : string | null,
    workHour : string | null , 
    phoneNumber : string | null,
    siteDescription : string | null,
    socialMedia : string | null,
    logo : string | undefined,    
}