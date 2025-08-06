export interface GetCategory {
    id : string,
    name : string,
    state : string ,
    parentCategoryId : string ,
    parentCategoryName : string,
    items : string[] | null,
    itemsLength : number | null,
}

export interface PostCategory {
    name : string,
    parentCategoryId : string ,
}

export interface GetCategoryItems {
    name : string ,
    itemsName : string[]
}