export class Advertise implements IAdvertise {
  image: string;
  type: string;
  title: string;
  creator: string;
  createDate: Date;
  description: string;
  extraDataFile: string;
  userId: string;
}
export interface IAdvertise {
  image: string;
  type: string;
  title: string;
  creator: string;
  createDate: Date;
  description: string;
  extraDataFile: string;
  userId: string;
}
