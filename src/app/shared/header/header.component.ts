import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user!: User;

  constructor(private userService: UserService ) { 
    this.user = userService.user;
  }

  logout() {
    if (this.user.email.includes('gmail')) {
      this.userService.logoutGoogle();
      
    } else {
      this.userService.logout();
    }
  }

}
