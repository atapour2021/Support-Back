export class Sponsor implements ISponsor {
  isLegal: boolean;
  companyName: string;
  legalCode: string;
}
export interface ISponsor {
  isLegal: boolean;
  companyName: string;
  legalCode: string;
}
