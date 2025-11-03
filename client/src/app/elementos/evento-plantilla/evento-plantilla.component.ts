import { Component, OnInit } from '@angular/core';
import { Event } from '../../../assets/models/backendModels';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../core/services/events.service';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt, faClock, faDoorOpen, faPersonBooth, faMapPin, faBook, faMailBulk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-evento-plantilla',
  imports: [CommonModule, HeroComponent, FontAwesomeModule],
  templateUrl: './evento-plantilla.component.html',
  styleUrl: './evento-plantilla.component.css'
})
export class EventoPlantillaComponent implements OnInit {
  faCalendar = faCalendarAlt;
  faClock = faClock;
  faDoorOpen = faDoorOpen;
  faPersonBooth = faPersonBooth;
  faMapPin = faMapPin;
  faBook = faBook;
  faMailBulk = faMailBulk;
  event?: Event
  loading = false;
  error?: string;
  urlTitle?: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private eventsService: EventsService
  ) {}
  ngOnInit(): void {
    this.getEventFromUrl();
  }
  private getEventFromUrl(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (!title) {
      this.error = 'Noticia no encontrada';
      return;
    }
    this.urlTitle = title;
    this.getEventByTitle();
  }

  private getEventByTitle(): void {
    if (!this.urlTitle) return;
    this.loading = true;
    this.eventsService.getEventByUrl(this.urlTitle).subscribe({
      next: (data: Event) => {
        this.event = data;
        this.loading = false;
      },
      error: (err) => {
        this.router.navigateByUrl('/eventos');
      }
    });
  }
  goToInscription(): void {
    if (this.event && this.event.urlForm) {
      window.open(this.event.urlForm, '_blank');
    }
  }
}