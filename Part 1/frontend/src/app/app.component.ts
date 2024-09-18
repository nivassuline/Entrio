import { Component } from '@angular/core';
import { RepositoryCollection } from '../types';
import { RepositoriesService } from './services/repositories.service';
import { BodyComponent } from './layouts/body/body.component';
import { catchError, of } from 'rxjs';
import { HeaderComponent } from './layouts/body/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BodyComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  repositoryCollection: RepositoryCollection = {
    repositories : [],
    currentPage: 1,
    totalPages:  1,
    totalDocuments: 1
  }
  repositoriesLoading: boolean = true;
  perPage: number = 9;

  constructor(
    private repositoriesService: RepositoriesService
  ) {}

  ngOnInit() {
    this.loadRepositories(this.repositoryCollection.currentPage);
  }

  loadRepositories(page: number) {
    this.repositoriesService.getRepositories({ page, perPage: this.perPage })
    .pipe(
      catchError(err => {
        console.error('Search repository error:', err);
        return of({
          repositories: [],
          totalDocuments: 0,
          totalPages: 1,
          currentPage: 1
        } as RepositoryCollection);
      })
    )
    .subscribe((newRepositoryCollection: RepositoryCollection) => {
      this.repositoryCollection = newRepositoryCollection
      this.repositoriesLoading = false
    });
  }

  onRepositorySearch(repoName: string) {
    this.repositoriesLoading = true
    if (repoName.trim()) {
      this.repositoriesService.searchRepository(repoName)
        .pipe(
          catchError(err => {
            console.error('Search repository error:', err);
            return of({
              repositories: [],
              totalDocuments: 0,
              totalPages: 1,
              currentPage: 1
            } as RepositoryCollection);
          })
        )
        .subscribe((newRepositoryCollection: RepositoryCollection) => {
          this.repositoryCollection = newRepositoryCollection
          this.repositoriesLoading = false
        });
    } else {
      this.loadRepositories(1)
    }
  }
  
  onPageChange(page: number) {
    if (page >= 1 && page <= this.repositoryCollection.totalPages) {
      this.repositoriesLoading = true
      this.loadRepositories(page);
    }
  }
}
