import { RequestState, Type } from '../enum/request.enum';

export class Request implements IRequest {
  _id: string;
  userId: string;
  type: Type;
  applicant: string;
  requestDate: Date;
  requestState: RequestState;
  description: string;
}
export interface IRequest {
  _id: string;
  userId: string;
  type: Type;
  applicant: string;
  requestDate: Date;
  requestState: RequestState;
  description: string;
}
