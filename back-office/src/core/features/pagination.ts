
export class PaginationDto{
    page?:number;
    perPage?:number;
    search?:string;
    fromDate?:number;
    toDate?:number;
}
export const initPagination:PaginationDto={page:1, perPage:20}