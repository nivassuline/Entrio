import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpOptions } from '../../types';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request and return the expected data', () => {
    const mockUrl = 'http://api/repositories';
    const mockOptions: HttpOptions = {
      params: { page: 1, perPage: 10 },
      responseType: 'json'
    };
    const mockResponse = { data: 'sampleData' };

    service.get<{ data: string }>(mockUrl, mockOptions).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${mockUrl}?page=1&perPage=10`);
    
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('perPage')).toBe('10');
    expect(req.request.responseType).toBe('json');

    req.flush(mockResponse);
  });

  it('should perform GET request with different options', () => {
    const mockUrl = 'http://api/repositories';
    const mockOptions: HttpOptions = {
      headers: { 'Authorization': 'Bearer token' },
      params: { sort: 'asc' },
      responseType: 'json'
    };
    const mockResponse = { data: 'sortedData' };

    service.get<{ data: string }>(mockUrl, mockOptions).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${mockUrl}?sort=asc`);

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer token');
    expect(req.request.responseType).toBe('json');

    req.flush(mockResponse);
  });
});