import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notice-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-card.component.html',
  styleUrls: ['./notice-card.component.css']
})
export class NoticeCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() date: string = '';
  @Input() image: string = '';
  @Input() category: string = '';

  get formattedDate(): string {
    return new Date(this.date).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
