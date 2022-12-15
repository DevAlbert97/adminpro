import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  imageUpload !: File;
  imgTemp: string | ArrayBuffer | null = environment.imageTemp;

  constructor(public modalImageService: ModalImageService, private fileService: FileUploadService) {}

  ngOnInit(): void {}

  closeModal() {
    this.modalImageService.closeModal();
  }

  changeImage(event: any) {

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

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileService.updatePhoto(this.imageUpload, id, type).then(img => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'La imagen se cargo correctamente',
        showConfirmButton: false,
        timer: 1700
      });
      this.modalImageService.newImg.emit(img);
      this.imgTemp = environment.imageTemp;
      this.closeModal();
    });
  }

}
