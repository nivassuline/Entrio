import { Component, EventEmitter, Input,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryComponent } from '../../components/repository/repository.component';
import { RepositoryCollection } from '../../../types';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RepositoryComponent, CommonModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
  @Input() repositoryCollection: RepositoryCollection | null = null;
  @Input() repositoriesLoading: boolean = true;
  @Input() currentPage: number = 1;
  @Input() perPage: number = 9;

  @Output() pageChange = new EventEmitter<number>();

  changePage(newPage: number) {
    this.currentPage = newPage;
    this.pageChange.emit(this.currentPage);
  }



}