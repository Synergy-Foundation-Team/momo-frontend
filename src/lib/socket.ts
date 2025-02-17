import { io, Socket } from 'socket.io-client';

class SocketClient {
  private static instance: Socket | null = null;
  private static SOCKET_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  public static getInstance(): Socket {
    if (!this.instance) {
      this.instance = io(this.SOCKET_URL, {
        transports: ['websocket'],
        autoConnect: true,
      });
    }
    return this.instance;
  }
}

export const socket = SocketClient.getInstance();

// Event Types
export interface OrderResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

// Socket Events
export const orderEvents = {
  // Emit events
  createOrder: 'createOrder',
  updateOrder: 'updateOrder',
  makeDeliver: 'makeDeliver',
  deleteOrder: 'deleteOrder',
  
  // Listen events
  orderCreated: 'orderCreated',
  orderUpdated: 'orderUpdated',
  orderDelivering: 'orderDelivering',
  orderDeleted: 'orderDeleted',
};
