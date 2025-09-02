import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accordeon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
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
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  @Input() title: string = '';
  isExpanded: boolean = false;

  toggleAccordion() {
    this.isExpanded = !this.isExpanded;
  }
}import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

