import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class User {
    constructor(
        public name         : string,
        public email        : string,
        public password     ?: string,
        public img          ?: string,
        public google       ?: boolean,
        public role         ?: string,
        public uid          ?: string,
    ){}


    get imageUrl() {
       return !this.img ? `${base_url}/uploads/users/no-image` 
        : this.img?.includes('https') 
        ? this.img 
        : this.img 
        ? `${base_url}/uploads/users/${this.img}` 
        : `${base_url}/uploads/users/no-image` ;
    }
}