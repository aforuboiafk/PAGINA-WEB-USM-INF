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
      route: '/admin/galeria',
      color: '#00815C'
    },
    {
      title: 'Configuración',
      icon: '⚙️',
      description: 'Ajusta textos, enlaces y parámetros.',
      route: '/admin/configuracion',
      color: '#3b424c'
    },
    {
      title: 'Usuarios',
      icon: '👥',
      description: 'Gestiona roles y accesos del equipo.',
      route: '/admin/usuarios',
      color: '#808080'
    }
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
