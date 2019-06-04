import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMapaComponent } from './navbar-mapa.component';

describe('NavbarMapaComponent', () => {
  let component: NavbarMapaComponent;
  let fixture: ComponentFixture<NavbarMapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarMapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
