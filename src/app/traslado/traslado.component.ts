import { Component } from '@angular/core';
import { HeroComponent } from '../elementos/hero/hero.component';
import { AccordeonComponent } from '../elementos/accordeon/accordeon.component';

@Component({
  selector: 'app-traslado',
  imports: [HeroComponent, AccordeonComponent],
  templateUrl: './traslado.component.html',
  styleUrl: './traslado.component.css'
})
export class TrasladoComponent {

}
