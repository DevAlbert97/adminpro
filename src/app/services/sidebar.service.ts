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
        {title: 'Main', url: ''},
        {title: 'ProgressBar', url: 'progress'},
        {title: 'Graphs', url: 'graph-one'},
      ]
    },
  ];

  constructor() {}
}
