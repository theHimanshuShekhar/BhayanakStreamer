import { Component, OnInit} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

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

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user=>this.currentUsername = user?.name);
  }

  onCreateRoom(roomData:roomData) {
    // Create room from room service
    this.roomList.push({...roomData, owner:this.currentUsername, created: new Date() });
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
