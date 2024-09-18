import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RepositoryComponent } from './repository.component';
import { RepositoriesService } from '../../services/repositories.service';
import { of } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Repository } from '../../../types';

const mockRepository: Repository = {
  repoId: 1,
  name: 'Test Repo',
  description: 'A test repository',
  stargazers_count: 10,
  forks: 5,
  languages: ['TypeScript'],
  topics: ['Angular']
};

describe('RepositoryComponent', () => {
  let component: RepositoryComponent;
  let fixture: ComponentFixture<RepositoryComponent>;
  let repositoriesServiceSpy: jasmine.SpyObj<RepositoriesService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RepositoriesService', ['getRepository']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: RepositoriesService, useValue: spy },
        { provide: ElementRef, useValue: { nativeElement: document.createElement('dialog') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryComponent);
    component = fixture.componentInstance;
    repositoriesServiceSpy = TestBed.inject(RepositoriesService) as jasmine.SpyObj<RepositoriesService>;

    repositoriesServiceSpy.getRepository.and.returnValue(of(mockRepository));

    component.repository = mockRepository;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRepository on onViewClick and update selectedRepository', () => {
    const repoId = 1;

    component.onViewClick(repoId);

    expect(repositoriesServiceSpy.getRepository).toHaveBeenCalledWith(repoId);
    expect(component.selectedRepository).toEqual(mockRepository);
  });

  it('should open the modal on showModal', () => {
    const dialogElement = component.myModal.nativeElement as HTMLDialogElement;
    spyOn(dialogElement, 'showModal');

    component.showModal();
    
    expect(dialogElement.showModal).toHaveBeenCalled();
  });

  it('should close the modal on closeModal', () => {
    const dialogElement = component.myModal.nativeElement as HTMLDialogElement;
    spyOn(dialogElement, 'close');

    component.closeModal();

    expect(dialogElement.close).toHaveBeenCalled();
  });

  it('should display repository name and description in the card', () => {
    const cardTitle = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    const cardDescription = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(cardTitle.textContent).toContain(mockRepository.name);
    expect(cardDescription.textContent).toContain(mockRepository.description);
  });

  it('should display "No description available" if repository has no description', () => {
    component.repository.description = '';
    fixture.detectChanges();

    const cardDescription = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(cardDescription.textContent).toContain('No description available');
  });

  it('should show loading indicator in modal when selectedRepository is null', () => {
    component.selectedRepository = null;
    fixture.detectChanges();

    const loadingSpinner = fixture.debugElement.query(By.css('.loading'));
    expect(loadingSpinner).toBeTruthy();
  });

  it('should display repository details when selectedRepository is not null', () => {
    component.selectedRepository = mockRepository;
    fixture.detectChanges();

    const repoIdText = fixture.debugElement.query(By.css('.text-gray-500')).nativeElement;
    const repoName = fixture.debugElement.query(By.css('.card-title')).nativeElement;

    expect(repoIdText.textContent).toContain(`Repo ID: ${mockRepository.repoId}`);
    expect(repoName.textContent).toContain(mockRepository.name);
  });

  it('should display stargazers and forks count when selectedRepository is not null', () => {
    component.selectedRepository = mockRepository;
    fixture.detectChanges();

    const starsCount = fixture.debugElement.queryAll(By.css('.stat-value'))[0].nativeElement;
    const forksCount = fixture.debugElement.queryAll(By.css('.stat-value'))[1].nativeElement;

    expect(starsCount.textContent).toContain(mockRepository.stargazers_count);
    expect(forksCount.textContent).toContain(mockRepository.forks);
  });

  it('should display languages when available', () => {
    component.selectedRepository = mockRepository;
    fixture.detectChanges();
  
    const languagesBadges = fixture.debugElement.queryAll(By.css('.badge-primary'));
    expect(languagesBadges.length).toBe(mockRepository.languages?.length || 0);
  
    languagesBadges.forEach((badge, index) => {
      expect(badge.nativeElement.textContent).toContain(mockRepository.languages?.[index]);
    });
  });
  


  it('should display topics when available', () => {
    component.selectedRepository = mockRepository;
    fixture.detectChanges();

    const topicsBadges = fixture.debugElement.queryAll(By.css('.badge-secondary'));
    expect(topicsBadges.length).toBe(mockRepository.topics?.length || 0);

    topicsBadges.forEach((badge, index) => {
      expect(badge.nativeElement.textContent).toContain(mockRepository.topics?.[index]);
    });
  });


});
