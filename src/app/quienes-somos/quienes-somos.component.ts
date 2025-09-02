import { Component } from '@angular/core';
import { HeroComponent } from "../elementos/hero/hero.component";
import { AccordeonComponent } from '../elementos/accordeon/accordeon.component';
import { PeopleCardComponent } from '../elementos/people-card/people-card.component';

@Component({
  selector: 'app-quienes-somos',
  imports: [HeroComponent, AccordeonComponent, PeopleCardComponent],
  templateUrl: './quienes-somos.component.html',
  styleUrl: './quienes-somos.component.css'
})
export class QuienesSomosComponent {

}
