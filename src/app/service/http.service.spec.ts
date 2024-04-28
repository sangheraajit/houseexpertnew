/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { httpService } from './http.service';

describe('Service: Common', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [httpService]
    });
  });

  it('should ...', inject([httpService], (service: httpService) => {
    expect(service).toBeTruthy();
  }));
});
