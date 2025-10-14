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
   * - una URL completa tipo `data:image/png;base64,...`
   * - solo el texto base64 (en cuyo caso se asume `image/png` por defecto)
   * Si no hay imagen, devuelve null para no aplicar background-image.
   */
  getBackgroundBase64(): SafeStyle | null {
    if (!this.backgroundImage) return null;

    let dataUrl = this.backgroundImage.trim();

    // if (!dataUrl.startsWith('data:')) {
    //   dataUrl = `data:image/png;base64,${dataUrl}`;
    // }
    const cssValue = `url('${dataUrl}')`;
    return this.sanitizer.bypassSecurityTrustStyle(cssValue);
  }
}
