import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user        !: User;
  perfilForm  !: FormGroup;
  imageUpload !: File;
  imgTemp      : string | ArrayBuffer | null = environment.imageTemp;

  constructor(private userService: UserService, private fb: FormBuilder, private fileService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role, [Validators.required]]
    });
  }

  updatePerfil() {
    Swal.fire({
      title: 'Quieres realizar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.updatePerfil(this.perfilForm.value).subscribe(resp => {
          const {name, email} = this.perfilForm.value;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El perfil se actualizo correctamente',
            showConfirmButton: false,
            timer: 1700
          });
          this.user.name = name;
          this.user.email = email;
        }, err => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: err.error.msg,
            showConfirmButton: false,
            timer: 1700
          });
        });
      }
    });
  }

  changeImage(event:any) {

    const file = event.target.files[0];

    this.imageUpload = file;

    if (!file) {
      this.imgTemp = environment.imageTemp;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadPhoto() {
    this.fileService.updatePhoto(this.imageUpload, this.user.uid!, 'users').then(img => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'La imagen se cargo correctamente',
        showConfirmButton: false,
        timer: 1700
      });
      this.user.img = img;
      this.imgTemp = environment.imageTemp;
    });
  }

}
