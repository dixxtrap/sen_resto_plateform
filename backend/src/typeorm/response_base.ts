export class BaseResponse<T> {
  status: boolean;
  sessionExpired: boolean;
  data: T;
  message: string;
  static success<T>(data) {
    const response = new BaseResponse();
    response.data = data;
    response.status = true;
    response.sessionExpired = false;
    return response as BaseResponse<T>;
  }
}
