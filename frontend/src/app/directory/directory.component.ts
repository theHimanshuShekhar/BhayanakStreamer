import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {

  profileJSON:string = '';

  constructor(public auth: AuthService) { }

  ngOnInit(): void {}


  login() {
    this.auth.loginWithRedirect();
  }

}
