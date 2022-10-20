import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaysDetailsComponent } from './gateways-details.component';

describe('GatewaysDetailsComponent', () => {
  let component: GatewaysDetailsComponent;
  let fixture: ComponentFixture<GatewaysDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatewaysDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
