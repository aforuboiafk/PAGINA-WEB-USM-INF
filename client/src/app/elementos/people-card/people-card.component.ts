import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-people-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.css']
})
export class PeopleCardComponent {
  @Input() name: string = '';
  @Input() title: string = '';
  @Input() email: string = '';
  @Input() office: string = '';
  @Input() backgroundImage: string = '';
}
