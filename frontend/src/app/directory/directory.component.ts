import { Component, OnInit} from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { AuthService } from '@auth0/auth0-angular';
import { RoomService } from '../services/room.service';
import { Router } from '@angular/router';

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
    private socket:Socket,
    private router:Router) { }

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

  joinRoom(room:roomDetails) {
    // this.roomService.joinRoom(room);

    // Navigate to room page
    let roomID = (room.owner + room.name + room.created).replace(/\W/g, '');
    this.router.navigate(['room'], {queryParams:{id:roomID}})
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
