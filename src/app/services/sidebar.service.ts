import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      icon: 'mdi mdi-gauge',
      title: 'Dashboard',
      submenu: [
        { title: 'Main', url: '' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Graphs', url: 'graph-one' },
        { title: 'Promises', url: 'promises' },
        { title: 'Rxjs', url: 'rxjs' },
      ],
    },
  ];

  adminMenu: any[] = [
    {
      icon: 'mdi mdi-folder-lock-open',
      title: 'Mantenimientos',
      submenu: [
        { title: 'Usuarios', url: 'users', icon: 'mdi mdi-account-multiple' },
        { title: 'Hospitales', url: 'hospitals', icon: 'mdi mdi-hospital-building' },
        { title: 'Doctores', url: 'doctors', icon: 'mdi mdi-hospital' },
      ],
    }
  ];

  constructor() {}
}
