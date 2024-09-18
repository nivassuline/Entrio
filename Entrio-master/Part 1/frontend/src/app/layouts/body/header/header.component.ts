import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';
  error: string | null = null;

  @Output() onRepositorySearch = new EventEmitter<string>();


  onSearchSubmit(event: Event) {
    event.preventDefault();
    this.onRepositorySearch.emit(this.searchQuery.trim());
  }

  reset() {
    this.searchQuery = '';
    this.onRepositorySearch.emit('');
  }
}