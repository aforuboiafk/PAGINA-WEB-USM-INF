import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from '../elementos/hero/hero.component';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, HeroComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  cards = [
    { 
      title: 'Card 1', 
      date: '2024-06-01', 
      image: '../../assets/images/ELINF/' 
    },
    { 
      title: 'Card 2', 
      date: '2024-06-02', 
      image: 'assets/images/card2.jpg' 
    },
    { 
      title: 'Card 3', 
      date: '2024-06-03', 
      image: 'assets/images/card3.jpg' 
    },
    { 
      title: 'Card 4', 
      date: '2024-06-04', 
      image: 'assets/images/card4.jpg' 
    }
  ];

}
