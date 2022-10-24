import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GatewaysService } from './gateways.service';

import { Gateway, Device } from 'src/app/models';

describe('GatewaysService', () => {
  let service: GatewaysService;

  function isAGateway(obj: any): obj is Gateway {
    return '_id' in obj && 'name' in obj && 'serialNumber' in obj && 'ipv4' in obj && 'devices' in obj;
  }

  function isADevice(obj: any): obj is Device {
    return '_id' in obj && 'UID' in obj && 'vendor' in obj && 'createdAt' in obj && 'status' in obj;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [GatewaysService],
    });
    service = TestBed.inject(GatewaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new gateway', (done: DoneFn) => {
    const newGateway: Gateway = {
      serialNumber: 'asd',
      name: 'testGateway',
      ipv4: '127.0.0.1',
      devices: [],
    };
    service.AddGateway(newGateway).subscribe(
      (gateway) => {
        // If response is type Gateway
        // Then everything went well
        expect(isAGateway(gateway)).toBeTrue();
        done();
      },
      (error) => done.fail,
    );
  });

  it('should get all the getways', (done: DoneFn) => {
    service.GetAllGateways().subscribe(
      (gateways) => {
        // If we get all gateways
        // We don't know how many there are saved in DB at a time
        // So we check if it is an array
        // And if it has some object if it is instance of Gateway
        // Then everything went well
        expect(gateways.constructor).toEqual(Array);
        if (gateways.length > 0) expect(isAGateway(gateways[0])).toBeTrue();
        done();
      },
      (error) => done.fail,
    );
  });

  it('should get one specific gateway', (done: DoneFn) => {
    const newGateway: Gateway = {
      serialNumber: 'asd',
      name: 'testGateway',
      ipv4: '127.0.0.1',
      devices: [],
    };
    service.AddGateway(newGateway).subscribe(
      (gateway) => {
        const testGateway = gateway;
        service.GetGateway(testGateway._id as string).subscribe(
          (gateway) => {
            // If we add a gateway
            // And search it by id
            // And the response is equal to the one we have
            // Then everything is ok
            expect(gateway).toEqual(testGateway);
            done();
          },
          (error) => done.fail,
        );
      },
      (error) => done.fail,
    );

  });
});
