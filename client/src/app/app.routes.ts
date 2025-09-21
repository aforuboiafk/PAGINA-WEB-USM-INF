import { Routes } from '@angular/router';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MallasComponent } from './mallas/mallas.component';
import { PracticaComponent } from './practica/practica.component';
import { TitulacionComponent } from './titulacion/titulacion.component';
import { TrasladoComponent } from './traslado/traslado.component';
import { GaleriasComponent } from './galerias/galerias.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InicioComponent } from './inicio/inicio.component';
import { AdmisionComponent } from './admision/admision.component';
import { CarreraComponent } from './carrera/carrera.component';
import { IbtCarreraComponent } from './ibt-carrera/ibt-carrera.component';
import { TuCarreraComponent } from './tu-carrera/tu-carrera.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'mallas', component: MallasComponent },
  { path: 'practica', component: PracticaComponent },
  { path: 'titulacion', component: TitulacionComponent },
  { path: 'traslado', component: TrasladoComponent },
  { path: 'galerias', component: GaleriasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admision', component: AdmisionComponent },
  {
    path: 'carreras',
    children: [
      { path: 'ingenieria-en-informatica', component: IbtCarreraComponent },
      { path: 'tecnico-universitario', component: TuCarreraComponent }
    ]
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' } // Wildcard route for 404
];
