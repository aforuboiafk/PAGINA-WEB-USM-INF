import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { EventsService } from '../../core/services/events.service';
import { Event, CreateEventRequest, UpdateEventRequest } from '../../../assets/models/backendModels';
import { HeroComponent } from '../../elementos/hero/hero.component';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, HeroComponent],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  events: Event[] = [];
  loading = false;
  error?: string;
  success?: string;

  isEditing = false;
  currentEvent?: Event;
  modal: any;

  // form shape matches CreateEventRequest
  form: CreateEventRequest = {
    title: '',
    resumen: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    hour: '12:00',
    endHour: '',
    audience: 'Abierto',
    location: 'Otro',
    topic: 'Vinculación con el Medio',
    contact: 'comunicaciones@inf.utfsm.cl',
    modality: 'PRESENCIAL',
    image: ''
  };

  quillConfig = {
    toolbar: { container: [['bold','italic','underline'],['link','image'],[{ 'list': 'ordered'}, { 'list': 'bullet' }],['clean']] }
  };

  // preview toggle
  showPreview = true;

  constructor(private eventsService: EventsService) {}

  togglePreview(): void { this.showPreview = !this.showPreview; }

  ngOnInit(): void { this.loadEvents(); }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('eventModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  loadEvents(): void {
    this.loading = true;
    this.eventsService.getAll().subscribe({
      next: (data) => { this.events = data; this.loading = false; },
      error: (err) => { console.error(err); this.error = 'Error al cargar eventos'; this.loading = false; }
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.currentEvent = undefined;

    const now = new Date();
    const date = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,10);
    const hour = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(11,16);

    this.form = {
      title: '',
      resumen: '',
      description: '',
      date,
      hour,
      endHour: '',
      audience: '',
      location: '',
      topic: '',
      contact: '',
      modality: 'PRESENCIAL',
      image: ''
    };
    this.error = undefined;
    this.modal?.show();
  }

  openEditModal(evt: Event): void {
    this.isEditing = true;
    this.currentEvent = evt;

    // try to populate date and hour — event.hour may already exist
    const datePart = evt.date ? new Date(evt.date).toISOString().slice(0,10) : '';

    this.form = {
      title: evt.title,
      resumen: evt.resumen ?? '',
      description: evt.description,
      date: datePart,
      hour: evt.hour ?? '',
      endHour: (evt as any).endHour ?? '',
      audience: (evt as any).audience ?? '',
      location: (evt as any).location ?? '',
      topic: (evt as any).topic ?? '',
      contact: (evt as any).contact ?? '',
      modality: evt.modality,
      image: evt.image
    };
    this.error = undefined;
    this.modal?.show();
  }

  closeModal(): void { this.modal?.hide(); this.error = undefined; }

  saveEvent(): void {
    const { title, description, image, date, hour, modality } = this.form;
    if (!title || !description || !image || !date || !hour || !modality) {
      this.error = 'Título, descripción, imagen, fecha, hora y modalidad son obligatorios';
      return;
    }

    // Combine date + hour into ISO date for backend
    const isoDate = new Date(`${date}T${hour}`).toISOString();
    const payload = { ...this.form, date: isoDate } as CreateEventRequest;

    this.loading = true;
    this.error = undefined;

    if (this.isEditing && this.currentEvent) {
      this.eventsService.update(this.currentEvent.id, payload as UpdateEventRequest).subscribe({
        next: () => { this.success = 'Evento actualizado correctamente'; this.closeModal(); this.loadEvents(); },
        error: (err) => { console.error(err); this.error = err.error?.message || 'Error al actualizar evento'; this.loading = false; }
      });
    } else {
      this.eventsService.create(payload).subscribe({
        next: () => { this.success = 'Evento creado correctamente'; this.closeModal(); this.loadEvents(); },
        error: (err) => { console.error(err); this.error = err.error?.message || 'Error al crear evento'; this.loading = false; }
      });
    }
  }

  deleteEvent(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este evento?')) return;
    this.loading = true;
    this.eventsService.delete(id).subscribe({
      next: () => { this.success = 'Evento eliminado correctamente'; this.loadEvents(); },
      error: (err) => { console.error(err); this.error = 'Error al eliminar evento'; this.loading = false; }
    });
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div'); tmp.innerHTML = html; return tmp.textContent || tmp.innerText || ''; }

  clearMessages(): void { this.error = undefined; this.success = undefined; }

  handleImageUpload(ev: any): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) { this.form.image = ''; return; }
    const reader = new FileReader();
    reader.onload = () => { this.form.image = reader.result as string; };
    reader.onerror = () => { this.error = 'No se pudo convertir la imagen seleccionada.'; this.form.image = ''; };
    reader.readAsDataURL(file);
  }

  getFormattedDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}
