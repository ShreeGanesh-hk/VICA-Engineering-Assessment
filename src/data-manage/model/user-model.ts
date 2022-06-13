export enum Roles {
 "admin" = 0,
 "editor" = 1,
}

export interface User{
    id : number,
    name:string,
    role:Roles.editor | Roles.admin,
}