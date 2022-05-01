export class ListResponse<T> implements IListResponse<T> {
  listData: T[];
  totalItem: number;
  page: number;
  pageSize: number;
  success: boolean;
  successMassage: string | undefined;
  errorMassage: string | undefined;

  init(body: IListResponse<T>): void {
    this.success = body['success'];
    this.successMassage = body['successMassage'];
    this.errorMassage = body['errorMassage'];
    this.listData = body['listData'];
    this.totalItem = body['totalItem'];
    this.page = body['page'];
    this.pageSize = body['pageSize'];
  }

  pagination(page: number, pageSize: number, data: T[]): void {
    this.listData = data.slice(page, page + pageSize);
    this.totalItem = data.length;
  }
}
export interface IListResponse<T> {
  listData: T[];
  totalItem: number;
  page: number;
  pageSize: number;
  success: boolean;
  successMassage: string | undefined;
  errorMassage: string | undefined;
}

export interface IPaginate {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}
