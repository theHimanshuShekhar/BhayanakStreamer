import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface roomData {
  name: string;
  password?: string;
}

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})


export class CreateRoomComponent implements OnInit {

  @Output() roomDetails = new EventEmitter<roomData>();

  createForm: FormGroup | any;

  constructor() { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      roomname: new FormControl('', Validators.required),
      password: new FormControl(''),
    });
  }


  get roomname() { return this.createForm.get('roomname'); }
  get password() { return this.createForm.get('password'); }


  createRoom() {
    this.roomDetails.emit({name: this.roomname.value, password: this.password.value});
  }


}
