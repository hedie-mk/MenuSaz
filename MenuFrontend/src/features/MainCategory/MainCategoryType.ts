export interface GetMainCategory {
    id : string,
    name : string,
    state : string ,
    categories : string[] | null,
    categoriesLength : number | null,
}

export interface PostMainCategory {
    name : string,
}

export interface GetCategoryCategories {
    name : string ,
    categories : string[]
}