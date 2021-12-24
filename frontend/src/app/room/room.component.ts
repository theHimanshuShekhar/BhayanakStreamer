import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { RoomService } from '../services/room.service';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, AfterViewInit {
  @ViewChild('VideoPlayer', { static: false })
  public videoPlayer: any;

  roomName?: string;
  userList?: Array<any>;
  stream?: any;
  recievedstream: MediaSource = new MediaSource();
  sourceBuffer?: SourceBuffer;

  constructor(
    private socket: Socket,
    private auth: AuthService,
    public roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.videoPlayer.nativeElement.src = URL.createObjectURL(
      this.recievedstream
    );
  }
  ngOnInit(): void {
    // Create mediasource and assign to videoplayer src
    this.recievedstream.addEventListener('sourceopen', () => {
      console.log('addSourceBuffer');
      this.sourceBuffer = this.recievedstream.addSourceBuffer(
        'video/webm;codecs=vp8'
      );
    });

    this.auth.user$.subscribe((user: any) => {
      if (user) {
        let roomID = this.route.snapshot.queryParamMap.get('id');
        if (roomID) this.roomService.joinRoom(roomID);

        this.socket.on('getRoomData', (roomData: any) => {
          if (roomData.owner === user.name) this.captureStream();
          if (roomData.owner !== user.name) {
            // recieve binary blobs of webm and add to mediasource
            this.socket.on('videoStreamData', (blob: any) => {
              console.log(this.recievedstream.readyState);
              if (this.sourceBuffer) this.sourceBuffer.appendBuffer(blob);
            });
          }
        });
      }
    });
  }

  captureStream() {
    navigator.mediaDevices
      //@ts-ignore
      .getDisplayMedia({
        audio: true,
        video: true,
      })
      .then((stream: any) => {
        this.stream = stream;
        console.log(stream);
        this.roomService.sendStream(stream);

        if (this.stream && this.videoPlayer)
          this.videoPlayer.nativeElement.srcObject = this.stream;
      });
  }
}
