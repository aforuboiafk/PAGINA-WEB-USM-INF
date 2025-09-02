import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  @Input() subtitle?: string = '';
}
