import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-accordeon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordeon.component.html',
  styleUrls: ['./accordeon.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('expanded', style({
        height: '*',
        overflow: 'hidden',
        opacity: '1'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class AccordeonComponent {
  @Input() title: string = '';
  isExpanded: boolean = false;

  toggleAccordion() {
    this.isExpanded = !this.isExpanded;
  }
}
