
import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface HttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface Repository {
    repoId: number,
    name: string,
    stargazers_count?: number,
    description: string,
    forks?: number,
    languages?: [string],
    forks_count?: number,
    topics?: [string]
  }



export interface RepositoryCollection {
    repositories: Repository[],
    totalDocuments: number,
    totalPages: number,
    currentPage: number

}

export interface PaginationParams {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    page: number;
    perPage: number;
}