import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  providers:[],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
    constructor(private formBuilder:FormBuilder,private router:Router,private authService:AuthService) {}

    public registrationForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
      dob: ['', Validators.required]
    }, { validator: this.passwordMatchValidator })

    passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const password = control.get('password')!;
      const confirmPassword = control.get('confirmPassword')!;
  
      if (password.value !== confirmPassword.value) {
        return { 'passwordMismatch': true };
      }
  
      return null;
    }

    public addCustomer(info:any) {
      this.authService.addCustomer(info).subscribe()
    }

    onSubmit(){
      const formData:any = { 
        firstName: this.registrationForm.get('firstName')?.value || '',
        lastName: this.registrationForm.get('lastName')?.value || '',
        email: this.registrationForm.get('email')?.value || '',
        password: this.registrationForm.get('password')?.value || ''
      };

      this.addCustomer(formData);

      this.registrationForm.reset();
      this.router.navigate(['home']);
      
    }

    backToHome() {
      this.authService.hideEverything = false;
      this.router.navigate(['home']);
    }

    showPassword = false;

    changeType() {
      this.showPassword = !this.showPassword;
    }
}
