export interface GetMainCategory {
    id : string,
    name : string,
    state : string ,
    categories : string[] | null,
    categoriesLength : number | null,
}

export interface PostMainCategory {
    id: string | null;
    name : string;
}

export interface Category {
    id : string
    name : string
    priority : number
    state : string 
    parentCategoryId : string 
    parentCategoryName : string
}

export interface GetCategoryCategories {
    name : string ,
    categories : Category[]
}