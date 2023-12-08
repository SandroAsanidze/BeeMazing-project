import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { AuthService } from './shared/services/auth-service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,FooterComponent,HttpClientModule],
  providers:[AuthService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router:Router,public authService:AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentPath = this.router.url;

      const route = this.router.url;
      const segments = route.split('/');
      const id = Number(segments[segments.length - 1]);

      if(currentPath === '/registration') {
        this.authService.hideEverything = true;
      }
      else {
        this.authService.hideEverything = false;
      }
      
      if (
        currentPath !== '/home' &&
        currentPath !== '/products' &&
        currentPath !== '/cart' &&
        currentPath !== '/help' &&
        currentPath !== `/products/${id}`
      ){
        this.authService.hideEverything = true;
      }
  });
  }
  title = 'bee_mazing';
}
