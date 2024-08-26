export class BaseResponse<T> {
  status: boolean;
  sessionExpired: boolean;
  data: T;
  message: string | [string];
  totalPage: number=0;
  static success<T>(data) {
    const response = new BaseResponse();
    response.data = data;
    response.status = true;
    response.sessionExpired = false;
    return response as BaseResponse<T>;
  }
  static successWithPagination<T>(data, count, perpage) {
   const  totalPage=Math.round(count/perpage)
    const response = new BaseResponse();
    response.data = data;
    response.status = true;
    response.sessionExpired = false;
    response.totalPage = totalPage===0?1:totalPage;
    return response  as BaseResponse<T>;
  }
}
