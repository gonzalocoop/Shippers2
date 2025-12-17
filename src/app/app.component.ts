import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { inject as injectAnalytics } from '@vercel/analytics';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FrontEnd_SI62_G5';
  isAppLoading: boolean = true;
  role: string = '';
  showTalleres = false;
  showUserMenu = false;
  isAuthChecked = false;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private router: Router,
    private lS: LoginService
  ) { }

  ngOnInit() {
    // Initialize Vercel Web Analytics on browser only
    if (isPlatformBrowser(this.platformId)) {
      injectAnalytics();
    }

    // Primero verificamos sesión
    this.role = this.lS.showRole();
    // Cuando verifica usuario, ocultamos el loader
    setTimeout(() => {
      this.isAppLoading = false;
    }, 500);
    // Ya sabemos si hay sesión → activamos todo
    this.isAuthChecked = true;
  }


  goHome() {
    this.router.navigate(['/homes']);
  }



  abrirMaki() {
    console.log("Abrir Maki...");
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/landing']);
  }

  verificar() {
    this.role = this.lS.showRole();
    return this.lS.verificar();
  }
  isAdmin() {
    return this.role === 'ADMINISTRADOR';
  }

  isUser() {
    return this.role === 'USUARIO';
  }

  isEmprender() {
    return this.role === 'EMPRENDEDOR';
  }
}
