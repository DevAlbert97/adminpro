import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2'

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    confirmation: ['',[Validators.required, Validators.minLength(6)]],
    terms: [,Validators.required]
  }, {
    validators: this.samePasswords('password', 'confirmation')
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  createUser(){
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('dashboard');
      },
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.msg,
          showConfirmButton: false,
          timer: 3000
        });
        console.warn(err.error.msg);
      }
    });
  }

  fieldNoValid(field: string) : boolean {
    return this.registerForm.get(field)?.invalid && this.formSubmitted ? true : false;
  }

  aceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  validPasswords() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('confirmation')?.value;

    return (pass1 !== pass2) && this.formSubmitted ? true : false;
  }
  
  samePasswords(pass: string, conf: string){
    return (formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass);
      const pass2Control = formGroup.get(conf);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({notSame: true});
      }
    } 
  }

}
