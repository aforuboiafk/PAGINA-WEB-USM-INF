import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Event, CreateEventRequest, UpdateEventRequest } from '../../../assets/models/backendModels';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private base = `${environment.apiBaseUrl}/api/events`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.base);
  }

  getById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.base}/${id}`);
  }

  create(body: CreateEventRequest): Observable<Event> {
    return this.http.post<Event>(this.base, body);
  }

  update(id: number, body: UpdateEventRequest): Observable<Event> {
    return this.http.put<Event>(`${this.base}/${id}`, body);
  }

  delete(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.base}/${id}`);
  }

  getLatest(limit: number = 5): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.base}/getLastNews/${limit}`);
  }

}