export class BaseResponse<T> implements IBaseResponse<T> {
  data: T;
  success: boolean;
  successMassage: string;
  errorMassage: string;

  init(body: IBaseResponse<T>): void {
    this.data = body['data'];
    this.success = body['success'];
    this.successMassage = body['successMassage'];
    this.errorMassage = body['errorMassage'];
  }
}
export interface IBaseResponse<T> {
  data: T;
  success: boolean;
  successMassage: string;
  errorMassage: string;
}
