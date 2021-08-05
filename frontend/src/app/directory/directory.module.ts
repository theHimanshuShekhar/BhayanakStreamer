import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory.component';
import { CreateRoomComponent } from '../components/create-room/create-room.component';


@NgModule({
  declarations: [
    DirectoryComponent,
    CreateRoomComponent,
  ],
  imports: [
    CommonModule,
    DirectoryRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DirectoryModule { }
