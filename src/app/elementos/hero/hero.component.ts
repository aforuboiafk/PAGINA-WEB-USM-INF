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

  getBackgroundImageUrl(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url('/assets/${this.backgroundImage}')`);
  }
}
