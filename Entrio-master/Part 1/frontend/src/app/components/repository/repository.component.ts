import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Repository, } from '../../../types';
import { RepositoriesService } from '../../services/repositories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.css'
})
export class RepositoryComponent {
  @ViewChild('myModal') myModal!: ElementRef;
  @Input() repository!: Repository
  constructor(
    private repositoriesService: RepositoriesService
  ) {}

  selectedRepository: Repository | null = null 

  onViewClick(repoId: number) {
    this.repositoriesService
    .getRepository(repoId)
    .subscribe((repository: Repository) => {
      console.log(repository)
      this.selectedRepository = repository
      
    })
    this.showModal();
  }

  showModal() {
    const dialog = this.myModal.nativeElement as HTMLDialogElement;
    dialog.showModal();
  }

  closeModal() {
    const dialog = this.myModal.nativeElement as HTMLDialogElement;
    dialog.close();
  }
}
