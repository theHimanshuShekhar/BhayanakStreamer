import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';

interface roomDetails {
  name: string;
  password?: string;
  owner?: string;
  created: Date;
}

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  currentRoom?: string;

  roomUsers?: Array<any>;

  constructor(private socket: Socket, private router: Router) {}

  createRoom(roomDetails: roomDetails) {
    this.socket.emit('createRoom', roomDetails);
  }

  get CurrentRoom(): string | undefined {
    return this.currentRoom;
  }

  get RoomUsers(): Array<any> | undefined {
    return this.roomUsers;
  }

  joinRoom(roomID: string) {
    this.socket.emit('joinRoom', roomID);
    // Save room in current room
    this.currentRoom = roomID;

    this.socket.on('getJoinedSockets', (joinedSockets: Array<any>) => {
      console.log(joinedSockets);
      this.roomUsers = joinedSockets;
    });
  }
}
