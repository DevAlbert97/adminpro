import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePhoto(file: File, id: string, type: 'users'| 'doctors' | 'hospitals') {
    try {
      const url = `${base_url}/uploads/${type}/${id}`;
      const formData = new FormData();
      formData.append('image',file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      return data.ok ? data.fileName : false ;

    } catch (error) {
      // console.log(error);
      return false;
    }
  }
}
