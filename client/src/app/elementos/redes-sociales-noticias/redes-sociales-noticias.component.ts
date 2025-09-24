import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPrint } from '@fortawesome/free-solid-svg-icons';



interface Link {
  name: string;
  url: string;
  icon: any;
  color: string;
}

@Component({
  selector: 'app-redes-sociales-noticias',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './redes-sociales-noticias.component.html',
  styleUrls: ['./redes-sociales-noticias.component.css']
})
export class RedesSocialesNoticiasComponent {
  linksList: Link[] = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/sharer/sharer.php?u=',
      icon: faFacebook,
      color: '#3b5998'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/intent/tweet?url=',
      icon: faTwitter,
      color: '#1da1f2'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/shareArticle?url=',
      icon: faLinkedin,
      color: '#0077b5'
    },
    {
      name: 'WhatsApp',
      url: 'https://api.whatsapp.com/send?text=',
      icon: faInstagram, 
      color: '#25D366'
    },
    {
      name: 'Email',
      url: 'mailto:?body=',
      icon: faEnvelope,
      color: '#D44638'
    },
    {
      name: 'Print',
      url: 'javascript:window.print()',
      icon: faPrint,
      color: '#AAAAAA'
    }
  ];

}
