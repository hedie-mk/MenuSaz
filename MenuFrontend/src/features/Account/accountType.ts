export interface GetAccount {
    id : string;
    userName : string ;
    email : string | null;
    phone : string | null;
    role : string;
    createdAt : Date
}

export interface CreateAccount {
    userName : string;
    password : string;
}

export interface UpdateAccount {
    id : string ;
    userName : string ;
    email : string | null;
    phone : string | null
}

export interface ChangePassword {
    id : string;
    password : string;
    currentPassword : string;
}