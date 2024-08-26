export class ProductManagementDayDto{
        id?:number;
        productManagementId?:number;
        dayId?:number;
        day?:DayDto
        isActive?:boolean
}
export class  DayDto{
        id?:number;
        name?:string;
        dayNumber?:number
}