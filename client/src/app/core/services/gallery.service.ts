import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Gallery, CreateGalleryRequest, UpdateGalleryRequest, GalleryCategory } from '../../../assets/models/backendModels';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private base = `${environment.apiBaseUrl}/api/gallery`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Gallery[]> { return this.http.get<Gallery[]>(this.base); }
  getByCategory(category: GalleryCategory): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.base}/category/${category}`);
  }
  getById(id: number): Observable<Gallery> { return this.http.get<Gallery>(`${this.base}/${id}`); }
  create(body: CreateGalleryRequest): Observable<Gallery> { return this.http.post<Gallery>(this.base, body); }
  update(id: number, body: UpdateGalleryRequest): Observable<Gallery> { return this.http.put<Gallery>(`${this.base}/${id}`, body); }
  delete(id: number) { return this.http.delete<{ ok: boolean }>(`${this.base}/${id}`); }
}