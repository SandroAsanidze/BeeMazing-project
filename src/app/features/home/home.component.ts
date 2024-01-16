import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router:Router){}

  shopNow(){
    this.router.navigate(['products']);
  }


  brands = [
    { imageUrl: '../../assets/slider/free-adidas-logo-icon.svg', altText: 'adidas' },
    { imageUrl: '../../assets/slider/gucci.svg', altText: 'gucci' },
    { imageUrl: '../../assets/slider/ecco.svg', altText: 'ecco' },
    { imageUrl: '../../assets/slider/jordan.svg', altText: 'jordan' },
    { imageUrl: '../../assets/slider/puma.svg', altText: 'puma' },
    { imageUrl: '../../assets/slider/louis-vuitton.svg', altText: 'louis-vuitton' }
  ];
}
