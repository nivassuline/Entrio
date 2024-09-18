import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Repository, RepositoryCollection } from '../../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  constructor(private apiService: ApiService) { }

  getRepositories = (params: PaginationParams): Observable<RepositoryCollection> => {
    return this.apiService.get(`${environment.apiUrl}/api/repositories`, {
      params,
      responseType: 'json'
    })
  }
  searchRepository = (repoName: string): Observable<RepositoryCollection> => {
    return this.apiService.get(`${environment.apiUrl}/api/repository`, {
      params: {name: repoName},
      responseType: 'json'
    })
  }
  getRepository = (repoId: number): Observable<Repository> => {
    return this.apiService.get(`${environment.apiUrl}/api/repository`, {
      params: {id: repoId},
      responseType: 'json'
    })
  }
}
