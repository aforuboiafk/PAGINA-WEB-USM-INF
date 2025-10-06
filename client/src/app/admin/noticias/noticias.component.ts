import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { NewsService } from '../../core/services/news.service';
import { News, CreateNewsRequest, UpdateNewsRequest } from '../../../assets/models/backendModels';
import { HeroComponent } from "../../elementos/hero/hero.component";

declare var bootstrap: any;

@Component({
  selector: 'app-admin-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, HeroComponent],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  news: News[] = [];
  loading = false;
  error?: string;
  success?: string;
  
  isEditing = false;
  currentNews?: News;
  modal: any;
  
  form: CreateNewsRequest = {
    title: '',
    description: '',
    image: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  };

  quillConfig = {
    toolbar: {
      container: [
        // Formato de texto básico
        ['bold', 'italic', 'underline', 'strike'],
        
        // Bloques especiales
        ['blockquote', 'code-block'],
        
        // Encabezados con dropdown completo
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        
        // Listas
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        
        // Subíndice y superíndice
        [{ 'script': 'sub'}, { 'script': 'super' }],
        
        // Indentación
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        
        // Dirección del texto
        [{ 'direction': 'rtl' }],
        
        // Tamaños de fuente
        [{ 'size': ['small', false, 'large', 'huge'] }],
        
        // Colores
        [{ 'color': [] }, { 'background': [] }],
        
        // Fuentes
        [{ 'font': [] }],
        
        // Alineación
        [{ 'align': [] }],
        
        // Limpiar formato
        ['clean'],
        
        // Media
        ['link', 'image', 'video']
      ]
    },
    imageResize: true,
    clipboard: {
      matchVisual: false
    }
  }

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('newsModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  loadNews(): void {
    this.loading = true;
    this.newsService.getAll().subscribe({
      next: (data) => {
        this.news = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al cargar noticias';
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.currentNews = undefined;
    this.form = {
      title: '',
      description: '',
      image: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    };
    this.error = undefined;
    this.modal?.show();
  }

  openEditModal(news: News): void {
    this.isEditing = true;
    this.currentNews = news;
    this.form = {
      title: news.title,
      description: news.description,
      image: news.image,
      category: news.category,
      date: news.date.split('T')[0]
    };
    this.error = undefined;
    this.modal?.show();
  }

  closeModal(): void {
    this.modal?.hide();
    this.error = undefined;
  }

  saveNews(): void {
    if (!this.form.title || !this.form.description) {
      this.error = 'Título y descripción son obligatorios';
      return;
    }

    // Limpia cualquier imagen base64 del contenido
    const formData = {
      ...this.form,
    };

    console.log('Enviando datos:', formData);

    this.loading = true;
    this.error = undefined;

    if (this.isEditing && this.currentNews) {
      this.newsService.update(this.currentNews.id, formData as UpdateNewsRequest).subscribe({
        next: () => {
          this.success = 'Noticia actualizada correctamente';
          this.closeModal();
          this.loadNews();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          this.error = 'Error al actualizar noticia';
          this.loading = false;
        }
      });
    } else {
      this.newsService.create(formData).subscribe({
        next: () => {
          this.success = 'Noticia creada correctamente';
          this.closeModal();
          this.loadNews();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          this.error = 'Error al crear noticia';
          this.loading = false;
        }
      });
    }
  }

  deleteNews(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta noticia?')) return;

    this.loading = true;
    this.newsService.delete(id).subscribe({
      next: () => {
        this.success = 'Noticia eliminada correctamente';
        this.loadNews();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al eliminar noticia';
        this.loading = false;
      }
    });
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  clearMessages(): void {
    this.error = undefined;
    this.success = undefined;
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.form.image = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.form.image = reader.result as string;
    };
    reader.onerror = () => {
      this.error = 'No se pudo convertir la imagen seleccionada.';
      this.form.image = '';
    };
    reader.readAsDataURL(file);
  }
}
