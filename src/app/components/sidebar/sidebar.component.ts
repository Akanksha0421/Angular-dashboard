import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() stacks: any[] = [];
  @Input() selectedStackId: number | null = null;
  @Output() stackSelect = new EventEmitter<number>();

  onSelect(stackId: number) {
    this.stackSelect.emit(stackId);
  }
}
