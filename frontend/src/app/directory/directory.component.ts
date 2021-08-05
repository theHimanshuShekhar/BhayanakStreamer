import { Component, OnInit} from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { AuthService } from '@auth0/auth0-angular';
import { RoomService } from '../services/room.service';

interface roomData {
  name: string;
  password?: string;
}

interface roomDetails {
  name: string;
  password?: string;
  owner?: string;
  created: Date;
}

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  roomList:Array<roomDetails> = [];

  currentUsername: string | undefined = '';

  profileJSON:string = '';

  userCount:number = 0;

  constructor(public auth: AuthService,
    private roomService: RoomService,
    private socket:Socket) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user=>this.currentUsername = user?.name);

    // Get active users
    this.socket.on('count', (count:number) => this.userCount = count);

    // Get active rooms
    this.socket.emit('getRooms');
    this.socket.on('getRooms', (rooms:Array<roomDetails>) => this.roomList = rooms);
  }

  onCreateRoom(roomData:roomData) {
    // Create room from room service
    this.roomService.createRoom({...roomData, owner:this.currentUsername, created: new Date() })
  }


  login() {
    this.auth.loginWithRedirect();
  }
}
