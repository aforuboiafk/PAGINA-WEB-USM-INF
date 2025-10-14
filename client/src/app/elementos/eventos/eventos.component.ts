import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Event } from '../../../assets/models/backendModels';
import { EventsService } from '../../core/services/events.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;
  faClock = faClock;
  events: Event[] = [];
  loading = false;
  error?: string;

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  private fetchEvents() {
    this.loading = true;
    this.eventsService.getAll().subscribe({
      next: (evts) => { this.events = evts; this.loading = false; },
      error: (err) => { this.error = 'Error cargando eventos'; console.error(err); this.loading = false; }
    });
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  redirectToEventDetail(event: Event): void {
    this.router.navigate(['/evento', event.id]);
  }

}
