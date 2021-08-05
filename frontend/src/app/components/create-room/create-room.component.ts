import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  createForm: FormGroup | any;

  constructor() { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      roomname: new FormControl('', Validators.required),
      password: new FormControl(''),
    });
  }


  get roomname() { return this.createForm.get('roomname'); }


  createRoom() {
    console.log(this.roomname.value);
  }


}
