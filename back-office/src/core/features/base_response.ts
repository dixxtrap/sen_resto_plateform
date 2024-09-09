export type BaseResponse<T>={
  imagePath: any
    status:boolean,
sessionExpired:boolean,
totalPage:number,
data:T
}