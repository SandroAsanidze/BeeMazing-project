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

    onSubmit(){}
}
