export class Sponsor implements ISponsor {
  userId: string;
  isLegal: boolean;
  companyName: string;
  legalCode: string;
}
export interface ISponsor {
  userId: string;
  isLegal: boolean;
  companyName: string;
  legalCode: string;
}
