export class Advertise implements IAdvertise {
  image: string;
  creator: string;
  createDate: Date;
  description: string;
  extraDataFile: string;
}
export interface IAdvertise {
  image: string;
  creator: string;
  createDate: Date;
  description: string;
  extraDataFile: string;
}
