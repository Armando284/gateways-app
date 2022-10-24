import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GatewaysListComponent } from './gateways-list.component';
import { GatewaysService } from 'src/app/services/gateways.service';

describe('GatewaysListComponent', () => {
  let component: GatewaysListComponent;
  let fixture: ComponentFixture<GatewaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GatewaysService, HttpClient],
      declarations: [GatewaysListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
