import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Notification } from '../entities/notification.entity';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow requests from any frontend
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  async sendNotificationAlert(newNotification: Notification) {
    try{
      this.server.emit('notificationAlert', {newNotification});
      console.log('Notification sent using web-sockets');
    }
    catch(error){
      console.error('Error in sending notifications: ', error.message);
    }
  }
}
