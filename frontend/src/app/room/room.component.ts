import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { RoomService } from '../services/room.service';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  roomName?: string;
  userList?: Array<any>;

  constructor(
    private socket: Socket,
    private auth: AuthService,
    public roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      if (user) {
        let roomID = this.route.snapshot.queryParamMap.get('id');
        if (roomID) this.roomService.joinRoom(roomID);
      }
    });
  }
}
