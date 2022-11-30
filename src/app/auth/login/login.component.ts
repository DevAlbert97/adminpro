import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  formSubmitted = false;

  loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email')||'', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [localStorage.getItem('remember') || false]
  });


  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement, 
      { theme: "outline", size: "large" } // customization attributes
    );
  }

  login() {

    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
          localStorage.setItem('remember', this.loginForm.get('remember')?.value);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }
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

  fieldNoValid(field: string) {
    return this.loginForm.get(field)?.invalid && this.formSubmitted ? true : false;
  }

}
