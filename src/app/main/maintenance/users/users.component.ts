import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { User } from '../../../models/user.model';

import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  totalUsers    : number = 0;
  users         : User[] = [];
  usersTemp     : User[] = [];
  fromPage      : number = 0;
  loading       : boolean = true;
  toogleModal   : boolean = true;
  imgSubs       !: Subscription;

  constructor(private userService: UserService, private searchesService: SearchesService, private modalImageService: ModalImageService) {
   }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.chargeUsers();
    this.imgSubs = this.modalImageService.newImg.pipe(delay(100)).subscribe(img => this.chargeUsers());
  }

  chargeUsers() {
    this.loading = true;
    this.userService.chargeUsers(this.fromPage).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  changePage(value: number) {
    this.fromPage += value;

    if (this.fromPage < 0) {
      this.fromPage = 0;
    } else if(this.fromPage > this.totalUsers) {
      this.fromPage -= value;
    }

    this.chargeUsers();
  }

  search(term: string) {
    if (term.length===0) {
      return this.users = this.usersTemp;
    }

    return this.searchesService.search('users',term).subscribe(resp => {
        this.users = resp;
      });
  }

  deleteUser(user: User) {

    if (this.userService.uid === user.uid) {
      Swal.fire({
        title: 'No puede eliminar su usuario',
        icon: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    Swal.fire({
      title: 'Borrar Usuario',
      text: `¿Seguro de eliminar a ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.uid!).subscribe(resp => {
          this.chargeUsers();
          Swal.fire({
            icon: 'success',
            title: 'El usuario se elimino correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        });
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'info',
          title: 'Operacion cancelada',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  changeRole(user: User) {
    this.userService.updateUser(user).subscribe({
      next: resp => {
        Swal.fire({
          icon: 'success',
          title: 'El rol de usuario se modifico correctamente',
          showConfirmButton: false,
          timer: 1200
        });
      },
      error: err => {
        Swal.fire({
          icon: 'warning',
          title: 'El rol de usuario no se pudo modificar',
          showConfirmButton: false,
          timer: 1200
        });
      }
    });
  }

  openModal(user: User) {
    this.modalImageService.openModal('users',user.uid!,user.img!);
  }

}
