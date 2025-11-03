import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Gallery, CreateGalleryRequest, UpdateGalleryRequest } from '../../../assets/models/backendModels';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = `${environment.apiBaseUrl}/api/gallery`;

  constructor(private http: HttpClient) {}

  getGalleries(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl);
  }

  getGalleryById(id: number): Observable<Gallery> {
    return this.http.get<Gallery>(`${this.apiUrl}/${id}`);
  }

  createGallery(payload: CreateGalleryRequest): Observable<Gallery> {
    return this.http.post<Gallery>(this.apiUrl, payload);
  }

  updateGallery(id: number, payload: UpdateGalleryRequest): Observable<Gallery> {
    return this.http.put<Gallery>(`${this.apiUrl}/${id}`, payload);
  }

  deleteGallery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}