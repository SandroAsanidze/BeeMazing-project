import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

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
      dob: ['', Validators.required]
    })

    onSubmit(){
      console.log(this.registrationForm.value);
      this.registrationForm.reset();
      this.router.navigate(['home']);
    }

    backToHome() {
      this.authService.hideEverything = false;
      this.router.navigate(['home']);
    }
}
