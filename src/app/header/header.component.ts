import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface SocialLink {
  name: string;
  url: string;
  img: string;
}

export interface MenuItem {
  name: string;
  url: string;
  submenu?: MenuItem[];
  isOpen?: boolean;
}


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  faCaretDown = faCaretDown;
  faBars = faBars;
  faX = faX;

  isMobileMenuOpen = false;

  socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/usm',
      img: '../../../assets/icons/logo_facebook.svg'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/usm',
      img: 'logo_instagram.svg'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      img: '../../../assets/icons/logo_twitter.svg'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com',
      img: '../../../assets/icons/logo_youtube.svg'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      img: '../../../assets/icons/logo_linkedin.svg'
    }
  ];

  menuItems: MenuItem[] = [
    {
      name: 'Inicio',
      url: '/'
    },
    { name: 'Quiénes somos', url: '/quienes-somos' },
    { name: 'Admisión', url: '/admision' },
    {
      name: 'Información',
      url: '#',
      submenu: [
        { name: 'Ingeniería en Informática', url: '/carreras/ingenieria-en-informatica' },
        { name: 'Técnico Universitario en Informática', url: '/carreras/tecnico-universitario' },
        {
          name: 'Práctica',
          url: '/practica'
        },
        { name: 'Titulación', url: '/titulacion' },
        { name: 'Traslado', url: '/traslado' },

      ]
    },
    { name: 'Galerías', url: '/galerias' },
    { name: 'Noticias', url: '/noticias' },
    { name: 'Contacto', url: '/contacto' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    // Close all submenus
    this.menuItems.forEach(item => item.isOpen = false);
  }

  toggleSubmenu(item: MenuItem) {
    item.isOpen = !item.isOpen;
  }
}
