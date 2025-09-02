import { Component } from '@angular/core';
import { HeroComponent } from "../elementos/hero/hero.component";
import { AccordeonComponent } from "../elementos/accordeon/accordeon.component";

@Component({
  selector: 'app-practica',
  imports: [HeroComponent, AccordeonComponent],
  templateUrl: './practica.component.html',
  styleUrl: './practica.component.css'
})
export class PracticaComponent {

}
