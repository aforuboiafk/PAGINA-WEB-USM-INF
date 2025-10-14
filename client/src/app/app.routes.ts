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
import { NoticiaPlantillaComponent } from './elementos/noticia-plantilla/noticia-plantilla.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NoticiasComponent as AdminNoticiasComponent } from './admin/noticias/noticias.component';
import { EventosComponent as AdminEventComponent } from './admin/eventos/eventos.component';
import { EventoPlantillaComponent } from './elementos/evento-plantilla/evento-plantilla.component';
import { EventosComponent } from './eventos/eventos.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'noticias/:title', component: NoticiaPlantillaComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'eventos/:title', component: EventoPlantillaComponent },
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
  { path: 'admin', component: DashboardComponent },
  { path: 'admin/noticias', component: AdminNoticiasComponent },
  { path: 'admin/eventos', component: AdminEventComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' } // Wildcard route for 404
];
