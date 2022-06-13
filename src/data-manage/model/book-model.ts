export interface Book {
    id: number,
    title: string,
    author: string,
    published:string,
    genre:string,
    borrower:string
}

export const EmptyBook = {
    id:0,
    title:"",
    author: "",
    published:"",
    genre:"",
    borrower:""
} as Book