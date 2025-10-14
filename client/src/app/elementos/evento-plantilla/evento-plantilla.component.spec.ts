import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoPlantillaComponent } from './evento-plantilla.component';

describe('EventoPlantillaComponent', () => {
  let component: EventoPlantillaComponent;
  let fixture: ComponentFixture<EventoPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoPlantillaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
