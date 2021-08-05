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

  constructor(private socket:Socket) { }

  createRoom(roomDetails:roomDetails) {
    this.socket.emit('createRoom', roomDetails);
  }
}
