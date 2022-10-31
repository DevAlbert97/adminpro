import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(user=> user);
    // const promise = new Promise((resolve, reject) => {
    //   resolve('Hola mundo');
    // });
    // promise.then((mensaje) => {
    //   console.log(mensaje);
    // }).catch(error => {
    //   console.log('Error en mi promesa', error)
    // });
  }

  getUsers() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users').then(resp => resp.json()).then(body=>body.data);
    });
  }

}
