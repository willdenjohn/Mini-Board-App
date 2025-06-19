import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BoardItem } from '../../core/models/board-item.model';

@Component({
  selector: 'app-board-item',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './item-board.component.html', // Corrija aqui
  styleUrls: ['./item-board.component.scss'],
})
export class BoardItemComponent {
  @Input() item!: BoardItem;
  @Input() resizeHandles: string[] = [];
  @Output() remove = new EventEmitter<number>();
  @Output() dragStart = new EventEmitter<any>();
  @Output() dragMove = new EventEmitter<any>();
  @Output() dragEnd = new EventEmitter<any>();
  @Output() resizeStart = new EventEmitter<any>();
  @Output() resizeMove = new EventEmitter<any>();
  @Output() resizeEnd = new EventEmitter<any>();
  @Output() touchStart = new EventEmitter<any>();
  @Output() touchMove = new EventEmitter<any>();
  @Output() touchEnd = new EventEmitter<any>();
  @Output() resizeTouchStart = new EventEmitter<any>();
  @Output() resizeTouchMove = new EventEmitter<any>();
  @Output() resizeTouchEnd = new EventEmitter<any>();
  @Output() documentMouseMove = new EventEmitter<any>();
  @Output() documentMouseUp = new EventEmitter<any>();
  @Output() documentTouchMove = new EventEmitter<any>();
  @Output() documentTouchEnd = new EventEmitter<any>();
}
