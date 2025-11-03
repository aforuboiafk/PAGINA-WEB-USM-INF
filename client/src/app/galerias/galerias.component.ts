import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../elementos/hero/hero.component';
import { GalleryService } from '../core/services/gallery.service';
import { Gallery,  } from '../../assets/models/backendModels';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Component({
  selector: 'app-galerias',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './galerias.component.html',
  styleUrls: ['./galerias.component.css']
})
export class GaleriasComponent implements OnInit {

  images: Gallery[] = [];

  constructor(private galleryService: GalleryService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadImages()
  }

  categories: string[] = ['TODOS','EVENTOS', 'INSTALACIONES', 'ESTUDIANTES'];
  selectedCategory: string = 'TODOS';
  isPrimary: boolean = true;

  get filterColor(): string {
    return this.isPrimary ? 'var(--azul-usm)' : 'var(--azul-oscuro-usm)';
  }

  get filteredImages(): Gallery[] {
    if (this.selectedCategory === 'TODOS') {
      return this.images;
    }
    return this.images.filter(img => img.category === this.selectedCategory);
  }

  loadImages(): void {
    this.galleryService.getGalleries().subscribe({
      next: (data: Gallery[]) => {
        this. images = data.map(gallery => {
            gallery.images = JSON.parse(gallery.images as string)[0];
            return gallery;
        })
      },
      error: (err) => { 
        console.error('Error loading galleries', err);
      }
    });
  }


  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.isPrimary = !this.isPrimary;
  }

  getImageSrc(base64: string): string { 
    return `${base64}`;
  }

  getBackgroundImage(images: string): SafeStyle | null {
    const imageSrc = this.getImageSrc(images);
    if (!imageSrc) return null;

    let dataUrl = imageSrc.trim();
    if (!dataUrl) return null;

    if (!dataUrl.startsWith('data:')) {
      dataUrl = `data:image/png;base64,${dataUrl}`;
    }

    const cssValue = `url('${dataUrl}')`;
    return this.sanitizer.bypassSecurityTrustStyle(cssValue);
  }

}
