import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbtCarreraComponent } from './ibt-carrera.component';

describe('IbtCarreraComponent', () => {
  let component: IbtCarreraComponent;
  let fixture: ComponentFixture<IbtCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IbtCarreraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IbtCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
