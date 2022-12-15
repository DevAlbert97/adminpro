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
  adminMenuItems!: any[];
  user!: User;


  constructor(private sidebarService: SidebarService, private userService: UserService) { 
    this.menuItems = sidebarService.menu;
    this.user = userService.user;
    this.user.role === 'ADMIN_ROLE' ? this.adminMenuItems = sidebarService.adminMenu : this.adminMenuItems = [];
  }

  logout() {
    if (this.user.email.includes('gmail')) {
      this.userService.logoutGoogle();

    } else {
      this.userService.logout();
    }
  }

}
