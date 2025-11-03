import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { NewsService } from '../../core/services/news.service';
import { News, CreateNewsRequest, UpdateNewsRequest } from '../../../assets/models/backendModels';
import { HeroComponent } from "../../elementos/hero/hero.component";
import { RouterLink } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule, HeroComponent, RouterLink],
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
    resumen: '',
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

  // Controla si se muestra la vista previa junto al formulario
  showPreview = true;

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

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
    
    // Formato datetime-local: YYYY-MM-DDTHH:mm
    const now = new Date();
    const formattedDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    
    this.form = {
      title: '',
      resumen: '',
      description: '',
      image: '',
      category: '',
      date: formattedDate
    };
    this.error = undefined;
    this.modal?.show();
  }

  openEditModal(news: News): void {
    this.isEditing = true;
    this.currentNews = news;
    
    // Convertir la fecha ISO a formato datetime-local
    const date = new Date(news.date);
    const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    
    this.form = {
      title: news.title,
      resumen: news.resumen ?? '',
      description: news.description,
      image: news.image,
      category: news.category,
      date: formattedDate
    };
    this.error = undefined;
    this.modal?.show();
  }

  closeModal(): void {
    this.modal?.hide();
    this.error = undefined;
  }

  saveNews(): void {
    const { title, description, image, date } = this.form;

    if (!title || !description || !image || !date) {
      this.error = 'Título, descripción, imagen y fecha son obligatorios';
      return;
    }

    // Convierte la fecha datetime-local a ISO-8601 completo
    const formData = {
      ...this.form,
      date: new Date(date).toISOString()
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
          this.error = err.error?.message || 'Error al actualizar noticia';
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
          this.error = err.error?.message || 'Error al crear noticia';
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
