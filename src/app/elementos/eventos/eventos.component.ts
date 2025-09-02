import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

interface Event {
  id: number;
  title: string;
  date: string;
  hour: string;
  modality: string;
  image: string;
  description?: string;
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {
  faMapMarkerAlt = faMapMarkerAlt;
  faClock = faClock;
  events: Event[] = [
    {
      id: 1,
      title: 'Seminario de Inteligencia Artificial',
      date: '2024-04-15',
      hour: '14:00',
      modality: 'Presencial',
      image: '/assets/images/fondos-color/fondos_color_1.png'
    },
    {
      id: 2,
      title: 'Workshop de Desarrollo Web',
      date: '2024-04-20',
      hour: '10:00',
      modality: 'Virtual',
      image: '/assets/images/fondos-color/fondos_color_2.png'
    },
    {
      id: 3,
      title: 'Conferencia de Ciberseguridad',
      date: '2024-04-25',
      hour: '16:30',
      modality: 'Híbrida',
      image: '/assets/images/fondos-color/fondos_color_3.png'
    }
  ];

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
