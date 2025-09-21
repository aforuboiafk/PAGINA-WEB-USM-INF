import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '../../../assets/models/backendModels';
import { NewsService } from '../../core/services/news.service';

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

  constructor(private newsService: NewsService) {}

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
}
