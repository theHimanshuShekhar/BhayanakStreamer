import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  template: `
    <div class="flex items-center justify-center h-full gap-24">
      <div class="select-none text-2xl font-semibold">Login to join a room</div>
      <button (click)="login()"
          class="select-none shadow-2xl w-100 p-4 px-20 rounded-full bg-bhayanak-700 hover:bg-bhayanak-500 hover:text-gray-100 font-semibold transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105">Login</button>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => console.log(user))
  }

  login() {
    this.auth.loginWithRedirect();
  }

}
