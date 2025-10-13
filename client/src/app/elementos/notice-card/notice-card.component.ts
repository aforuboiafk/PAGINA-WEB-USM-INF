import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-notice-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notice-card.component.html',
  styleUrls: ['./notice-card.component.css']
})
export class NoticeCardComponent {
  @Input() title: string = '';
  @Input() resumen: string = '';
  @Input() description: string = '';
  @Input() date: string = '';
  @Input() image: string = '';
  @Input() category: string = '';
  @Input() link: string = '#';

  constructor(private sanitizer: DomSanitizer) {}

  getBackgroundBase64(): SafeStyle | null {
    if (!this.image) return null;

    let dataUrl = this.image.trim();
    if (!dataUrl.startsWith('data:')) {
      dataUrl = `data:image/png;base64,${dataUrl}`;
    }

    const cssValue = `url('${dataUrl}')`;
    return this.sanitizer.bypassSecurityTrustStyle(cssValue);
  }


  get formattedDate(): string {
    return new Date(this.date).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
