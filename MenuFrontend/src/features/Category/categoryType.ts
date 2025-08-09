export interface GetCategory {
    id : string
    name : string
    state : string 
    parentCategoryId : string 
    parentCategoryName : string
    items : string[] | null
    itemsLength : number | null
}

export interface PostCategory {
    id : string | null;
    name : string;
    parentCategoryId : string | null ;
}

export interface GetCategoryItems {
    name : string ,
    itemsName : string[]
}
export interface inactiveCategory {
    id : string,
    name : string,
    diactiveDateTime : Date
}
export interface MenuStatusCard {
  name: string;
  itemsLength: number;
}
