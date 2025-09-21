import { Component } from '@angular/core';
import { HeroComponent } from '../elementos/hero/hero.component';
import { AccordeonComponent } from '../elementos/accordeon/accordeon.component';

@Component({
  selector: 'app-titulacion',
  imports: [HeroComponent, AccordeonComponent],
  templateUrl: './titulacion.component.html',
  styleUrl: './titulacion.component.css'
})
export class TitulacionComponent {

}
