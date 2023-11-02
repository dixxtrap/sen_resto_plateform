export class IPagination {
  page?: number;
  pageSize?: number;
  search?: string;
  fromDate?: string;
}
export const initPagination: IPagination = { fromDate: "0000", page: 0, pageSize: 30, search: "" };
export const allPagination: IPagination = { fromDate: "0000", page: 0, pageSize: 100000000, search: "" };
export class IPaginationResult<T> {
  total?: number;
  pageLenght?: number;
  page?: number;
  data?: T[];
}
