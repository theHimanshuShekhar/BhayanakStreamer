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

  lastcodec: string = '';

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
    let sourceBuffer: SourceBuffer;
    // Create mediasource and assign to videoplayer src
    this.recievedstream.addEventListener('sourceopen', () => {
      if (this.recievedstream.sourceBuffers.length === 0) {
        console.log('addSourceBuffer');
        sourceBuffer = this.recievedstream.addSourceBuffer(
          'video/webm;codecs=vp8'
        );
        this.lastcodec = 'video/webm;codecs=vp8';
      }
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
              if (!sourceBuffer.updating && this.lastcodec !== blob.mimeType) {
                //@ts-ignore
                sourceBuffer.changeType(blob.mimeType);
                this.lastcodec = blob.mimeType;
              }
              if (!sourceBuffer.updating) {
                try {
                  sourceBuffer.appendBuffer(blob.data);
                } catch (err) {
                  console.error(err);
                }
              }
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
        this.roomService.sendStream(stream);

        if (this.stream && this.videoPlayer)
          this.videoPlayer.nativeElement.srcObject = this.stream;
        // this.videoPlayer.nativeElement.
      });
  }
}
