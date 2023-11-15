import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) {}
  
  ngOnInit(): void {}

    public loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })

    warningMessage: string = '';
    
    onSubmit(){
      this.authService.getInfo().subscribe(
        (data) => {
          data.forEach((item: { firstName:string;email: string; password: string;id:any }) => {
            if(this.loginForm.get('email')?.value === item.email && this.loginForm.get('password')?.value === item.password) {
              localStorage.setItem('isLogged','true');
              localStorage.setItem('name',item.firstName);
              localStorage.setItem('id',item.id);
              this.router.navigate(['home']);
            }
            else {
              this.warningMessage = 'Invalid email or password.';
            }
          });
        })
    }
}
