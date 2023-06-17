import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | any;

  constructor() {
    this.setupSocketConnection();
  }

  private setupSocketConnection(): void {
    this.socket = io('http://localhost:3000'); // Cambia la URL y el puerto según tu configuración del backend
  }

  getSocket(): Socket {
    return this.socket;
  }
}
