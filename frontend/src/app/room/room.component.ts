import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { RoomService } from '../services/room.service';
import { AuthService } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  roomName?:string;
  userList?:Array<any>;

  constructor(private socket:Socket, private roomService:RoomService, private auth:AuthService) { }

  ngOnInit(): void {
    console.log('currentRoom', this.roomService.CurrentRoom)
    let room = this.roomService.CurrentRoom ? this.roomService.CurrentRoom : null;

    if (room) {
      this.roomName = room.name;
      let roomID = (room.owner + room.name + room.created).replace(/\W/g, '');

      this.socket.emit('getRoomUsers', roomID)

      this.socket.on('getUserData', () => {
        this.auth.user$.pipe(take(1)).subscribe(user =>  this.socket.emit('getUserData', user));
      });

      this.socket.on('getRoomUsers',(users:any) => {
        console.log(users);
        this.userList = users;
      })
    }
  }

}
