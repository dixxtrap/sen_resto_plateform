export class CategoryDto{
        id?:number;
        name:string | null | undefined;
        parent:CategoryDto | null | undefined;
        children:CategoryDto[] | null | undefined;
}