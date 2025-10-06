import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '../../../assets/models/backendModels';
import { NewsService } from '../../core/services/news.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-noticias-recomendadas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './noticias-recomendadas.component.html',
  styleUrls: ['./noticias-recomendadas.component.css']
})
export class NoticiasRecomendadasComponent implements OnInit {
  noticias: News[] = [];
  loading = false;
  error?: string;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLatestNews();
  }

  private fetchLatestNews(): void {
    this.loading = true;
    this.newsService.getLatest(3).subscribe({
      next: news => {
        this.noticias = news;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'No pudimos cargar las noticias recomendadas.';
        this.loading = false;
      }
    });
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  goToNews(url?: string | null, title?: string) {
    const slug = url;
    this.router.navigate(['/noticias', slug]);
  }

  getDescriptionWithoutImages(description: string | null | undefined): string {
    if (!description) return '';
    const container = document.createElement('div');
    container.innerHTML = description;
    container.querySelectorAll('img').forEach(img => img.remove());
    const text = container.textContent || container.innerText || '';
    return text.trim();
  }

}
