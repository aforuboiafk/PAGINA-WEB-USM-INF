import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { HeroComponent } from '../elementos/hero/hero.component';
import { EventosComponent } from '../elementos/eventos/eventos.component';

interface Card {
  title: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, HeroComponent, EventosComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  // Font Awesome icons
  faArrowCircleRight = faArrowCircleRight;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
  faYoutube = faYoutube;

  cards: Card[] = [
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
