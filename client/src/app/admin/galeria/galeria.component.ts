import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GalleryService } from '../../core/services/gallery.service';
import { Gallery } from '../../../assets/models/backendModels';

declare const bootstrap: any;

interface GalleryForm {
  title: string;
  description: string;
  category: string;
  date: string;
  images: string[];
}

@Component({
  selector: 'app-galeria',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent implements OnInit {
  galleries: Gallery[] = [];
  loading = false;
  error?: string;
  success?: string;
  modal: any;
  isEditing = false;
  currentId?: number;

  form: GalleryForm = {
    title: '',
    description: '',
    category: 'EVENTOS',
    date: new Date().toISOString().split('T')[0],
    images: []
  };

  categories = ['EVENTOS', 'INSTALACIONES', 'ESTUDIANTES'];

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.loadGalleries();
  }

  loadGalleries(): void {
    this.loading = true;
    this.error = undefined;
    this.galleryService.getGalleries().subscribe({
      next: (data) => {
        this.galleries = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar galerías';
        this.loading = false;
        console.error(err);
      }
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.currentId = undefined;
    this.form = {
      title: '',
      description: '',
      category: 'EVENTOS',
      date: new Date().toISOString().split('T')[0],
      images: []
    };
    this.showModal();
  }

  openEditModal(gallery: Gallery): void {
    this.isEditing = true;
    this.currentId = gallery.id;
    const images = JSON.parse(gallery.images);
    this.form = {
      title: gallery.title,
      description: gallery.description || '',
      category: gallery.category,
      date: gallery.createdAt.split('T')[0],
      images: images
    };
    this.showModal();
  }

  showModal(): void {
    const modalElement = document.getElementById('galleryModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
      this.modal.show();
    }
  }

  hideModal(): void {
    if (this.modal) {
      this.modal.hide();
    }
  }

  handleImagesUpload(event: any): void {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const promises: Promise<string>[] = [];
    for (let i = 0; i < files.length; i++) {
      promises.push(this.fileToBase64(files[i]));
    }

    Promise.all(promises).then(base64Images => {
      this.form.images = [...this.form.images, ...base64Images];
    }).catch(err => {
      this.error = 'Error al procesar imágenes';
      console.error(err);
    });
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.form.images.splice(index, 1);
  }

  saveGallery(): void {
    if (!this.form.title.trim() || this.form.images.length === 0) {
      this.error = 'Título e imágenes son obligatorios';
      return;
    }

    const payload: any = {
      title: this.form.title,
      category: this.form.category,
      description: this.form.description,
      url: this.form.title.toLowerCase().replace(/\s+/g, '-'),
      images: JSON.stringify(this.form.images)
    };

    this.loading = true;
    const request = this.isEditing && this.currentId
      ? this.galleryService.updateGallery(this.currentId, payload)
      : this.galleryService.createGallery(payload);

    request.subscribe({
      next: () => {
        this.success = this.isEditing ? 'Galería actualizada' : 'Galería creada';
        this.hideModal();
        this.loadGalleries();
        setTimeout(() => this.success = undefined, 3000);
      },
      error: (err) => {
        this.error = 'Error al guardar galería';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteGallery(id: number): void {
    if (!confirm('¿Eliminar esta galería?')) return;

    this.galleryService.deleteGallery(id).subscribe({
      next: () => {
        this.success = 'Galería eliminada';
        this.loadGalleries();
        setTimeout(() => this.success = undefined, 3000);
      },
      error: (err) => {
        this.error = 'Error al eliminar galería';
        console.error(err);
      }
    });
  }

  copyUrl(id: number): void {
    const fullUrl = `${window.location.origin}/galerias/${id}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      this.success = 'URL copiada al portapapeles';
      setTimeout(() => this.success = undefined, 3000);
    }).catch(() => {
      this.error = 'Error al copiar URL';
      setTimeout(() => this.error = undefined, 3000);
    });
  }

  clearMessages(): void {
    this.error = undefined;
    this.success = undefined;
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString('es-CL');
  }

  getImageCount(images: string | string[]): number {
    if (Array.isArray(images)) {
      return images.length;
    }

    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed.length : 0;
      } catch {
        return 0;
      }
    }

    return 0;
  }
}
