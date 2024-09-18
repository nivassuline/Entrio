import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BodyComponent } from './body.component';
import { RepositoryComponent } from '../../components/repository/repository.component';
import { CommonModule } from '@angular/common';
import { Repository } from '../../../types';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';


const mockRepository: Repository = { repoId: 1, name: 'Test Repo', description: 'Description' }

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyComponent, CommonModule, RepositoryComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.repositoryCollection).toBeNull();
    expect(component.repositoriesLoading).toBeTrue();
    expect(component.currentPage).toBe(1);
    expect(component.perPage).toBe(9);
  });

  it('should emit pageChange event with new page number when changePage is called', () => {
    spyOn(component.pageChange, 'emit');

    component.changePage(2);

    expect(component.currentPage).toBe(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should display loading spinner when repositoriesLoading is true', () => {
    component.repositoriesLoading = true;
    fixture.detectChanges();

    const loadingSpinner = fixture.debugElement.query(By.css('.loading'));
    expect(loadingSpinner).toBeTruthy();
  });

  it('should display "No repositories found" message when repositoryCollection is empty', () => {
    component.repositoriesLoading = false;
    component.repositoryCollection = { repositories: [], totalPages: 1, currentPage: 1, totalDocuments: 1 };
    fixture.detectChanges();

    const noRepoMessage = fixture.debugElement.query(By.css('.text-gray-500'));
    expect(noRepoMessage.nativeElement.textContent).toContain('No repositories found');
  });

  it('should display the repositories when repositoryCollection has data', () => {
    component.repositoriesLoading = false;
    component.repositoryCollection = {
      repositories: [{ repoId: 1, name: 'Test Repo', description: 'Description' }],
      totalPages: 1,
      currentPage: 1,
      totalDocuments: 1
    };
    fixture.detectChanges();

    const repoComponents = fixture.debugElement.queryAll(By.directive(RepositoryComponent));
    expect(repoComponents.length).toBe(1);
  });

  it('should display pagination buttons based on totalPages in repositoryCollection', () => {
    component.repositoriesLoading = false;
    component.repositoryCollection = {
      repositories: [mockRepository],
      totalPages: 3,
      currentPage: 1,
      totalDocuments: 1
    };
    fixture.detectChanges();

    const paginationButtons = fixture.debugElement.queryAll(By.css('button'));
    expect(paginationButtons.length).toBe(3);
  });

  it('should disable pagination button for the current page', () => {
    component.repositoriesLoading = false;
    component.repositoryCollection = {
      repositories: [mockRepository],
      totalPages: 3,
      currentPage: 2,
      totalDocuments: 1
    };
    fixture.detectChanges();

    const activeButton = fixture.debugElement.query(By.css('.btn-active'));
    expect(activeButton.nativeElement.disabled).toBeTrue();
  });

  it('should call changePage when pagination button is clicked', () => {
    spyOn(component, 'changePage');
    
    component.repositoriesLoading = false;
    component.repositoryCollection = {
      repositories: [mockRepository],
      totalPages: 3,
      currentPage: 1,
      totalDocuments: 0
    };
    fixture.detectChanges();

    const paginationButton = fixture.debugElement.queryAll(By.css('button'))[1]; 
    paginationButton.nativeElement.click();

    expect(component.changePage).toHaveBeenCalledWith(2); 
  });
});
