import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Input() height: string = '500px';
  @Input() backgroundImage: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Devuelve un SafeStyle con la propiedad CSS background-image
   * El input `backgroundImage` puede ser:
   * - una URL data completa tipo `data:image/png;base64,...` (ya procesada)
   * - una ruta normal (images/foto.jpg, ./assets/img.png, etc.)
   */
  getBackgroundBase64(): SafeStyle | null {
    if (!this.backgroundImage) return null;

    const dataUrl = this.backgroundImage.trim();
    const cssValue = `url('${dataUrl}')`;
    return this.sanitizer.bypassSecurityTrustStyle(cssValue);
  }
}
