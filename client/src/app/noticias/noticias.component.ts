import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../elementos/hero/hero.component';
import { NoticeCardComponent } from '../elementos/notice-card/notice-card.component';
import { News } from '../../assets/models/backendModels';
import { NewsService } from '../core/services/news.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, HeroComponent, NoticeCardComponent],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  notices: News[] = [];
  loading = false;
  error?: string;
  categories: string[] = ['Todos'];
  selectedCategory = 'Todos';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  private loadNews(): void {
    this.loading = true;
    this.newsService.getAll().subscribe({
      next: data => {
        this.notices = data;
        const unique = Array.from(new Set(data.map(n => n.category))).filter(Boolean as any);
        this.categories = ['Todos', ...unique];
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'No pudimos cargar las noticias.';
        this.loading = false;
      }
    });
  }

  get filteredNotices(): News[] {
    if (this.selectedCategory === 'Todos') return this.notices;
    return this.notices.filter(notice => notice.category === this.selectedCategory);
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }
}
