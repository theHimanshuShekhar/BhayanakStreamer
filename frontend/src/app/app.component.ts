import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router:Router) {}

  routes = [
    "directory",
    "profile",
    "logout",
  ]

  title = 'Bhayanak Streamer';

  goto(route:String) {
    this.router.navigate([route]);
  }
}
