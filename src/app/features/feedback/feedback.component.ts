import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit {
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {}

  public feedbackForm = this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    fullName:['',Validators.required],
    address:['',Validators.required],
    address2:['',Validators.required],
    city:['',Validators.required],
    state:['',Validators.required],
    zip:['',Validators.required],
    description:['',[Validators.required,Validators.maxLength(100)]],
  })

  Submit() {
    this.feedbackForm.reset();
  }
}
