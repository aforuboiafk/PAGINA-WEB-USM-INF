import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '../../../assets/models/backendModels';
import { NewsService } from '../../core/services/news.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  news: News[] = [];
  loading = false;
  error?: string;

  constructor(private newsService: NewsService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getLatestNews();
  }

  getLatestNews() {
    this.loading = true;
    this.newsService.getLatest(4).subscribe({
      next: (items) => {
        this.news = items;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error cargando noticias';
        this.loading = false;
      }
    });
  }

  formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
  }

    // Add Router to the constructor

  goToNewsDetail(url: string) {
    this.router.navigateByUrl(`/noticias/${url}`);
  }

  /**
   * Convierte una cadena `image` (data URL o base64 crudo) en un SafeStyle
   * usable en `[style.backgroundImage]`. Devuelve null si no hay imagen.
   */
  getBackgroundBase64(image?: string): SafeStyle | null {
    if (!image) return null;

    let dataUrl = image.trim();
    if (!dataUrl) return null;

    if (!dataUrl.startsWith('data:')) {
      dataUrl = `data:image/png;base64,${dataUrl}`;
    }

    const cssValue = `url('${dataUrl}')`;
    return this.sanitizer.bypassSecurityTrustStyle(cssValue);
  }

}
