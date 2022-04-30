export class ListResponse<T> implements IListResponse<T> {
  listData: T[];
  totalCount: number;
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
    this.totalCount = body['totalCount'];
    this.page = body['page'];
    this.pageSize = body['pageSize'];
  }
}
export interface IListResponse<T> {
  listData: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  success: boolean;
  successMassage: string | undefined;
  errorMassage: string | undefined;
}
