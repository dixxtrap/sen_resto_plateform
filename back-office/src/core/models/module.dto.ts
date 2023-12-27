export class ModuleDto{
id?:number;
name?:string;
parentId?:number;
parent?:ModuleDto;
children?:ModuleDto[]
}