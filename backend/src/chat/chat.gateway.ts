import { Global } from "@nestjs/common/decorators/modules/global.decorator";
import { WebSocketServer } from "@nestjs/websockets/decorators/gateway-server.decorator";
import { WebSocketGateway } from "@nestjs/websockets/decorators/socket-gateway.decorator";
import { SubscribeMessage } from "@nestjs/websockets/decorators/subscribe-message.decorator";
import { OnGatewayConnection } from "@nestjs/websockets/interfaces/hooks/on-gateway-connection.interface";
import { OnGatewayDisconnect } from "@nestjs/websockets/interfaces/hooks/on-gateway-disconnect.interface";
import { OnGatewayInit } from "@nestjs/websockets/interfaces/hooks/on-gateway-init.interface";
import { Server, Socket } from 'socket.io';
@Global()
@WebSocketGateway({
  namespace:"v1",
  cors:{
    origin:"*"
  }
})
export class ChatGateway{

@WebSocketServer() server:Server
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload)
    this.server.emit('messageFrom', payload);
    return 'Hello world!'; 

  }
}
