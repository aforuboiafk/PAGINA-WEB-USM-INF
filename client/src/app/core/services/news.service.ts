import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { News, CreateNewsRequest, UpdateNewsRequest } from '../../../assets/models/backendModels';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private base = `${environment.apiBaseUrl}/api/news`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<News[]> { return this.http.get<News[]>(this.base); }
  getById(id: number): Observable<News> { return this.http.get<News>(`${this.base}/${id}`); }
  create(body: CreateNewsRequest): Observable<News> { return this.http.post<News>(this.base, body); }
  update(id: number, body: UpdateNewsRequest): Observable<News> { return this.http.put<News>(`${this.base}/${id}`, body); }
  delete(id: number) { return this.http.delete<{ ok: boolean }>(`${this.base}/${id}`); }
  getLatest(limit: number = 5): Observable<News[]> {
    return this.http.get<News[]>(`${this.base}/getLastNews/${limit}`);
  }
  getNewsByUrl(url: string): Observable<News> {
    return this.http.get<News>(`${this.base}/getByUrl/${url}`);
  }
}