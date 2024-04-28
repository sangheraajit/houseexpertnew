import { TestBed } from '@angular/core/testing';

import { LoggigInterceptor } from './loggig.interceptor';

describe('LoggigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoggigInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoggigInterceptor = TestBed.inject(LoggigInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
