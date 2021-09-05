export type Book = {
    thumbnailUrl:string
    title:string
    isbn:string
    pageCount:string
    publishedDate:{$date:string}
    status:string
    authors:string[]
    categories:string[]
    shortDescription:string
    longDescription:string
    }