import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionUsuarioComponent } from './opinion-usuario.component';

describe('OpinionUsuarioComponent', () => {
  let component: OpinionUsuarioComponent;
  let fixture: ComponentFixture<OpinionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpinionUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpinionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
