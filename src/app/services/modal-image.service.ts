import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hiddeModal: boolean = true;
  type  !: 'users' | 'hospitals' | 'doctors';
  id    : string = '';
  img   : string = '';

  newImg : EventEmitter<string> = new EventEmitter<string>();

  get hiddeModal() {
    return this._hiddeModal;
  }

  constructor() { }

  openModal(type: 'users'|'hospitals'|'doctors', id: string, img: string = 'no-img.jpg') {
    this._hiddeModal = false;
    this.type = type;
    this.id = id;
    if (img) {
      if (img.includes('https')) {
        this.img = img;
      } else {
        this.img = `${base_url}/uploads/${type}/${img}`;
      }
    } else {
      this.img = `${base_url}/uploads/${type}/${img}`
    }

  }

  closeModal() {
    this._hiddeModal = true;
  }
}
