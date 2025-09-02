import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../elementos/hero/hero.component';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

@Component({
  selector: 'app-galerias',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './galerias.component.html',
  styleUrls: ['./galerias.component.css']
})
export class GaleriasComponent {
  images: GalleryImage[] = [
    {
      id: 1,
      url: '/assets/images/fotografias/SVM/svm_1.jpg',
      title: 'Actividad 1',
      category: 'eventos'
    },
    {
      id: 2,
      url: '/assets/images/fotografias/SVM/svm_1.jpg',
      title: 'Laboratorio',
      category: 'instalaciones'
    },
    // Add more images here
  ];

  categories: string[] = ['todos', 'eventos', 'instalaciones', 'estudiantes'];
  selectedCategory: string = 'todos';
  isPrimary: boolean = true;

  get filterColor(): string {
    return this.isPrimary ? 'var(--azul-usm)' : 'var(--azul-oscuro-usm)';
  }

  get filteredImages(): GalleryImage[] {
    if (this.selectedCategory === 'todos') {
      return this.images;
    }
    return this.images.filter(img => img.category === this.selectedCategory);
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.isPrimary = !this.isPrimary;
  }
}
