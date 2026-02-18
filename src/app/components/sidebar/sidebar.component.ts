import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() stacks: any[] = [];
  @Input() selectedStackId: number | null = null;
  @Input() expanded = true;
  @Output() stackSelect = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  tabs = [
    { key: 'BACKLOG', label: 'BACKLOG' },
    { key: 'PENDING', label: 'PENDING' },
    { key: 'FINAL SIGN-OFF', label: 'FINAL SIGN-OFF' }
  ];
  selectedTab: string = 'BACKLOG';
  showFilter = false;
  filterText = '';

  constructor(private router: Router) {}

  onSelect(stackId: number) {
    this.stackSelect.emit(stackId);
  }

  onToggleSidebar() {
    this.toggle.emit();
  }

  goBack() {
    this.back.emit();
  }

  selectTab(tabKey: string) {
    this.selectedTab = tabKey;
    this.filterText = '';
  }

  getTabCount(tabKey: string): number {
    return this.stacks.filter(s => s.status === tabKey).length;
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    if (!this.showFilter) this.filterText = '';
  }

  filteredStacks() {
    let filtered = this.stacks.filter(s => s.status === this.selectedTab);
    if (this.filterText) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(this.filterText.toLowerCase()));
    }
    return filtered;
  }

  openStack(stack: any) {
    // Placeholder for open-in-new action
    window.open('https://example.com/stack/' + stack.id, '_blank');
  }
}
