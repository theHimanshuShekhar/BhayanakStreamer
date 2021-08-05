import { Component, OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Socket } from 'ngx-socket-io';

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

  constructor(public auth: AuthService, private socket:Socket) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user=>this.currentUsername = user?.name);
    this.socket.emit('count')
    this.socket.on('count', (count:number) => this.userCount = count)
  }

  onCreateRoom(roomData:roomData) {
    // Create room from room service
    this.roomList.push({...roomData, owner:this.currentUsername, created: new Date() });
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
