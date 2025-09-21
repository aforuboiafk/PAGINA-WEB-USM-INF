import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../elementos/hero/hero.component';
import { NoticeCardComponent } from '../elementos/notice-card/notice-card.component';

interface Notice {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
}

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, HeroComponent, NoticeCardComponent],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {
  notices: Notice[] = [
    {
      id: 1,
      title: 'Estudiantes USM desarrollan proyecto innovador',
      description: 'Estudiantes de Informática crean solución tecnológica para mejorar la calidad de vida...',
      date: '2024-03-15',
      image: '/assets/images/fondos-textura/fondo_textura_1.png',
      category: 'Investigación'
    },
    {
      id: 2,
      title: 'Nuevo enfoque en la enseñanza de la programación',
      description: 'La USM implementa metodologías innovadoras para la enseñanza de la programación...',
      date: '2024-03-16',
      image: '/assets/images/fondos-textura/fondo_textura_2.png',
      category: 'Académico'
    },
    {
      id: 3,
      title: 'Impacto de la inteligencia artificial en la educación',
      description: 'Un estudio sobre cómo la IA está transformando el aprendizaje en las aulas...',
      date: '2024-03-17',
      image: '/assets/images/fondos-textura/fondo_textura_3.png',
      category: 'Investigación'
    }
    // Add more notices here
  ];

  categories: string[] = ['Todos', 'Investigación', 'Eventos', 'Académico'];
  selectedCategory: string = 'Todos';

  get filteredNotices(): Notice[] {
    if (this.selectedCategory === 'Todos') {
      return this.notices;
    }
    return this.notices.filter(notice => notice.category === this.selectedCategory);
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }
}
