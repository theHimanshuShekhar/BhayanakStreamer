import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  logo = 'https://im.rediff.com/movies/2015/jan/02quiz1.jpg';


  constructor(private router:Router, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if(user?.picture) this.logo = user.picture
      console.log(user)
    });
  }

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
