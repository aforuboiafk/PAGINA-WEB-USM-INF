import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedesSocialesNoticiasComponent } from './redes-sociales-noticias.component';

describe('RedesSocialesNoticiasComponent', () => {
  let component: RedesSocialesNoticiasComponent;
  let fixture: ComponentFixture<RedesSocialesNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedesSocialesNoticiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedesSocialesNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
