import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cards = [
    {
      title: 'Noticias',
      icon: '📰',
      description: 'Crear, editar y publicar noticias.',
      route: '/admin/noticias',
      color: '#005e90'
    },
    {
      title: 'Eventos',
      icon: '📅',
      description: 'Administra eventos y agenda institucional.',
      route: '/admin/eventos',
      color: '#074469'
    },
    {
      title: 'Galería',
      icon: '🖼️',
      description: 'Sube y organiza imágenes oficiales.',
      route: '/admin/galerias',
      color: '#00815C'
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
