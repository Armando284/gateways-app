import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit the search parameter', () => {
    let searchParam: string = '';
    service.$emitter.subscribe((name) => {
      searchParam = name;
    })
    const testParam = 'test param';
    service.searchGatewayByName(testParam);
    expect(searchParam).toBe(testParam);
  });
});
