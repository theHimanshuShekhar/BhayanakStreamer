import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

interface roomDetails {
  name: string;
  password?: string;
  owner?: string;
  created: Date;
}


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  currentRoom?:roomDetails;

  constructor(private socket:Socket) { }

  createRoom(roomDetails:roomDetails) {
    this.socket.emit('createRoom', roomDetails);
  }

  sendPing(room:roomDetails) {
    this.socket.emit('ping',room);
    this.socket.on('pong', (pong:string) => console.log('ponged',pong))
  }

  joinRoom(room:roomDetails) {
    this.socket.emit('joinRoom', room);
    this.socket.on('joinRoom', (room:roomDetails) => this.currentRoom = room);
  }
}
