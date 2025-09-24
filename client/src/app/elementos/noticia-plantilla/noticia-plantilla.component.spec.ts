import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaPlantillaComponent } from './noticia-plantilla.component';

describe('NoticiaPlantillaComponent', () => {
  let component: NoticiaPlantillaComponent;
  let fixture: ComponentFixture<NoticiaPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaPlantillaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
