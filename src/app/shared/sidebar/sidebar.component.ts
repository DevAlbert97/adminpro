import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  menuItems!: any[];
  user!: User;


  constructor(private sidebarService: SidebarService, private userService: UserService) { 
    this.menuItems = sidebarService.menu;
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
