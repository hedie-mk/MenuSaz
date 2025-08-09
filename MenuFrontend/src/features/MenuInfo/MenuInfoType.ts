export interface MenuInfo { 
    id : string,
    name : string ,
    address : string | null,
    workHour : string | null , 
    phoneNumber : string | null,
    siteDescription : string | null,
    socialMedia : string | null,
    logo : string | undefined,
}
export interface PostMenuInfo {
    name : string ,
    address : string | null,
    workHour : string | null , 
    phoneNumber : string | null,
    siteDescription : string | null,
    socialMedia : string | null,
    logo : File | null,
}