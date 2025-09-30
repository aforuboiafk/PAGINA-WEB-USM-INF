import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { News } from '../../../assets/models/backendModels';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../core/services/news.service';
import { HeroComponent } from '../hero/hero.component';
import { RedesSocialesNoticiasComponent } from "../redes-sociales-noticias/redes-sociales-noticias.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NoticiasRecomendadasComponent } from "../noticias-recomendadas/noticias-recomendadas.component";


@Component({
  selector: 'app-noticia-plantilla',
  standalone: true,
  imports: [CommonModule, HeroComponent, RedesSocialesNoticiasComponent, FontAwesomeModule, NoticiasRecomendadasComponent],
  templateUrl: './noticia-plantilla.component.html',
  styleUrl: './noticia-plantilla.component.css'
})
export class NoticiaPlantillaComponent implements OnInit {
  new?: News; // Changed from 'new' to 'news' (better naming)
  loading = false;
  error?: string;
  urlTitle?: string;
  recommendedNews: News[] = [];

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.getNewsFromUrl();
    this.getRecommendedNews();
  }

  private getNewsFromUrl(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (!title) {
      this.error = 'Noticia no encontrada';
      return;
    }
    this.urlTitle = title;
    this.getNewsByTitle(); // Call this after setting urlTitle
  }

  private getNewsByTitle(): void {
    if (!this.urlTitle) return;
    
    this.loading = true;
    this.newsService.getNewsByUrl(this.urlTitle).subscribe({
      next: (data: News) => {
        this.new = data;
        this.getRecommendedNews();

        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.error = 'Error al cargar la noticia';
        this.loading = false;
      }
    });
  }

  getRecommendedNews() {
    this.newsService.getAdjacent(this.new!.id).subscribe({
      next: (data: any) => {
        this.recommendedNews = data;
        console.log(data);
        
      }
    });
  }


  goBack(): void {
    this.router.navigate(['/noticias']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
