import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GatewaysDetailsComponent } from './gateways-details.component';
import { of } from 'rxjs';

describe('GatewaysDetailsComponent', () => {
  let component: GatewaysDetailsComponent;
  let fixture: ComponentFixture<GatewaysDetailsComponent>;

  let activatedRoute;

  const activatedRouteStub = {
    paramMap: {
      subscribe() {
        return of();
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      declarations: [GatewaysDetailsComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
