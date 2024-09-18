import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RepositoriesService } from './services/repositories.service';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockRepositoriesService: jasmine.SpyObj<RepositoriesService>;

  beforeEach(async () => {
    mockRepositoriesService = jasmine.createSpyObj('RepositoriesService', ['getRepositories', 'searchRepository']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: RepositoriesService, useValue: mockRepositoriesService },
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toEqual('frontend');
  });

  it('should initialize repository collection on ngOnInit', () => {
    const mockCollection = {
      repositories: [],
      currentPage: 1,
      totalPages: 1,
      totalDocuments: 1
    };
    mockRepositoriesService.getRepositories.and.returnValue(of(mockCollection));

    component.ngOnInit();

    expect(mockRepositoriesService.getRepositories).toHaveBeenCalledWith({ page: 1, perPage: component.perPage });
    fixture.detectChanges();
    expect(component.repositoryCollection).toEqual(mockCollection);
  });

  it('should load repositories and handle errors correctly', () => {
    const mockCollection = {
      repositories: [],
      currentPage: 1,
      totalPages: 1,
      totalDocuments: 0
    };
    mockRepositoriesService.getRepositories.and.returnValue(of(mockCollection));

    component.loadRepositories(1);

    expect(mockRepositoriesService.getRepositories).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.repositoryCollection).toEqual(mockCollection);
    expect(component.repositoriesLoading).toBeFalse();
  });

  it('should handle errors in loadRepositories', () => {
    mockRepositoriesService.getRepositories.and.returnValue(throwError(() => new Error('Test Error')));

    component.loadRepositories(1);

    expect(mockRepositoriesService.getRepositories).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.repositoryCollection).toEqual({
      repositories: [],
      totalDocuments: 0,
      totalPages: 1,
      currentPage: 1
    });
    expect(component.repositoriesLoading).toBeFalse();
  });


  it('should load default repositories if search query is empty', () => {
    const mockCollection = {
      repositories: [],
      currentPage: 1,
      totalPages: 1,
      totalDocuments: 1
    };
    mockRepositoriesService.getRepositories.and.returnValue(of(mockCollection));

    component.onRepositorySearch('');

    expect(mockRepositoriesService.getRepositories).toHaveBeenCalledWith({ page: 1, perPage: component.perPage });
    fixture.detectChanges();
    expect(component.repositoryCollection).toEqual(mockCollection);
  });

  it('should not change page if page number is out of bounds', () => {
    component.onPageChange(0); // Invalid page number
    expect(mockRepositoriesService.getRepositories).not.toHaveBeenCalled();

    component.onPageChange(3); // Page number exceeding total pages
    expect(mockRepositoriesService.getRepositories).not.toHaveBeenCalled();
  });
});