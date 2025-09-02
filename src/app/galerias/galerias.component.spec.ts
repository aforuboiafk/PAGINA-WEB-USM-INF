import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriasComponent } from './galerias.component';

describe('GaleriasComponent', () => {
  let component: GaleriasComponent;
  let fixture: ComponentFixture<GaleriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
