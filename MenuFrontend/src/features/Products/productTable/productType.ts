export interface GetProduct {
    id : string,
    name : string,
    price : number,
    discountedPrice : number | null,
    description : string | null,
    state : string,
    categoryName : string | null,
    photo : string | null,
}

export interface PostProduct {
    name : string,
    description : string | null,
    price : number,
    discountedPrice : number | null,
    categoryId : string | null,
    photo : File | null
}
export interface UpdateProduct {
    id : string,
    name : string,
    description : string | null,
    price : number,
    discountedPrice : number | null,
    categoryId : string | null,
    photo : File | null
}
export interface AddCategory {
    id : string,
    categoryId : string,
}