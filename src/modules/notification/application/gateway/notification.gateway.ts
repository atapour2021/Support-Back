import { JwtService } from '@nestjs/jwt/dist';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserService } from '@root/user/domain/service/user.service';

@WebSocketGateway({ cors: true, transport: 'websockets' })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @WebSocketServer() private server: any;
  wsClients = [];

  async handleConnection(client: any) {
    this.wsClients.push(client);
    client.emit('connectionEvent', 'Connection successfully');
  }

  async handleDisconnect(client: any) {
    client.emit('Disconnect successfully');
  }

  async sendNotification(massage: string) {
    const users = await this.userService.findAll();
    this.wsClients.forEach((client: any) => {
      const token: any = this.jwtService.decode(client.handshake.auth.token);
      const adminUser = users.data.find((u) => u.profileId === token.profileId);
      if (adminUser) this.broadcast('notification', massage, client);
    });
  }

  @SubscribeMessage('notification')
  async onNotification(client, massage: string) {
    this.broadcast('notification', massage, client);
  }

  private broadcast(event, message: string, client: any) {
    const broadCastMessage = JSON.stringify(message);
    client.emit(event, broadCastMessage);
  }
}
