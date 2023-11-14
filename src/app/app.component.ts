import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './auth/auth.service';
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

      if(currentPath === '/registration') {
        this.authService.hideEverything = true;
      }
      else {
        this.authService.hideEverything = false;
      }
  });
  }
  title = 'bee_mazing';
}
