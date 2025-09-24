import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasRecomendadasComponent } from './noticias-recomendadas.component';

describe('NoticiasRecomendadasComponent', () => {
  let component: NoticiasRecomendadasComponent;
  let fixture: ComponentFixture<NoticiasRecomendadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasRecomendadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasRecomendadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
