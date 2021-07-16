import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  routes = [
    "directory",
    "profile",
    "logout",
  ]

  title = 'Bhayanak Streamer';
}
