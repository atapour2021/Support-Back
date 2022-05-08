export class Notification implements INotification {
  title: string;
  description: string;
  createDate: Date;
  creator: string;
  isVisited: boolean;
  userId: string;
}
export interface INotification {
  title: string;
  description: string;
  createDate: Date;
  creator: string;
  isVisited: boolean;
  userId: string;
}
