export class Token implements IToken {
  _id: string;
  hashToken: string;
  userId: string;
  expire: boolean;
}
export interface IToken {
  _id: string;
  hashToken: string;
  userId: string;
  expire: boolean;
}
