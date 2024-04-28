/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubcategoryService } from './subcategory.service';

describe('Service: Subcategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubcategoryService]
    });
  });

  it('should ...', inject([SubcategoryService], (service: SubcategoryService) => {
    expect(service).toBeTruthy();
  }));
});
