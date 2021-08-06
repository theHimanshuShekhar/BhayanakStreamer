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
  providedIn: 'root'
})
export class RoomService {

  currentRoom?:roomDetails;

  constructor(private socket:Socket, private router:Router) { }

  createRoom(roomDetails:roomDetails) {
    this.socket.emit('createRoom', roomDetails);
  }

  sendPing(room:roomDetails) {
    this.socket.emit('ping',room);
    this.socket.on('pong', (pong:string) => console.log('ponged',pong))
  }

  get CurrentRoom():roomDetails | undefined {return this.currentRoom}

  joinRoom(room:roomDetails) {
    this.socket.emit('joinRoom', room);
    this.socket.on('joinRoom', (room:roomDetails) => {
      // Save room in current room
      this.currentRoom = room;

      // Navigate to room page
      let roomID = (room.owner + room.name + room.created).replace(/\W/g, '');
      this.router.navigate(['room'], {queryParams:{id:roomID}})
    });
  }
}
