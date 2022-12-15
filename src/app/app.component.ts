import { Component, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

declare const google: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'adminpro';

  constructor(private userService: UserService, private router: Router, private ngZone: NgZone){  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '448816224966-6tea3rlcmdv80ds8s79h38gjeg0e983o.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
  }

  handleCredentialResponse(response: any) {
    this.userService.loginGoogle(response.credential).subscribe({
      next: resp => {
        this.ngZone.run(()=> {
          this.router.navigateByUrl('dashboard');
        });
      }
    });
  }
}
