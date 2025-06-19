import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from '../tool-bar/toolbar.component';
import { BoardItem, ItemType } from '../../core/models/board-item.model';
import { BoardItemComponent } from '../item-board/item-board.component';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, ToolbarComponent, BoardItemComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  resizeHandles = [
    'top-left', 'top', 'top-right',
    'right', 'bottom-right', 'bottom',
    'bottom-left', 'left'
  ];
items: BoardItem[] = [
  {
    id: 1,
    type: 'note',
    x: 100,
    y: 100,
    width: 200,
    height: 150,
    text: 'Minha nota',
    color: 'yellow',
  },
  {
    id: 2,
    type: 'shape',
    x: 350,
    y: 100,
    width: 100,
    height: 100,
    color: 'blue',
    shapeType: 'circle'
  },
  {
    id: 3,
    type: 'image',
    x: 100,
    y: 300,
    width: 150,
    height: 100,
    imageUrl: 'https://picsum.photos/150/100'
  }
];


  ngOnInit() {

    this.loadItems();
  }
addItem(type: string) {
  const newItem: BoardItem = {
    id: Date.now(),
    type: type as ItemType,
    x: 50,
    y: 50,
    width: 200,
    height: 150,
    color: 'yellow',
    text: '',
  };

  if (type === 'shape') {
    newItem.shapeType = 'rectangle';
  }

  if (type === 'image') {
    newItem.imageUrl = 'https://picsum.photos/200/150';
  }

  this.items.push(newItem);
}


  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  getNoteColorClass(color?: string): string {
    const colorMap: Record<string, string> = {
      yellow: 'bg-yellow-200',
      blue: 'bg-blue-200',
      green: 'bg-green-200',
      pink: 'bg-pink-200',
      purple: 'bg-purple-200'
    };
    return colorMap[color || 'yellow'];
  }

  getItemColorClass(color?: string): string {
    return this.getNoteColorClass(color);
  }

  // Drag handlers
  onDragStart(event: MouseEvent, item: BoardItem) {
    item.dragging = true;
    item.offsetX = event.clientX - item.x;
    item.offsetY = event.clientY - item.y;
  }

  onDragMove(event: MouseEvent, item: BoardItem) {
    if (item.resizing) return;
    if (!item.dragging) return;
    item.x = event.clientX - (item.offsetX ?? 0);
    item.y = event.clientY - (item.offsetY ?? 0);
  }

  onDragEnd(item: BoardItem) {
    item.dragging = false;
    // Se quiser persistir, adicione lógica aqui
  }

  // Resize handlers
  onResizeStart(event: MouseEvent, item: BoardItem, direction: string) {
    event.stopPropagation();
    item.resizing = true;
    item.resizeDirection = direction;
    item.resizeStartX = event.clientX;
    item.resizeStartY = event.clientY;
    item.startWidth = item.width;
    item.startHeight = item.height;
    item.offsetX = item.x;
    item.offsetY = item.y;
  }


  onResizeMove(event: MouseEvent, item: BoardItem) {
    if (!item.resizing || !item.resizeDirection) return;

    const dx = event.clientX - (item.resizeStartX ?? 0);
    const dy = event.clientY - (item.resizeStartY ?? 0);

    const dir = item.resizeDirection;

    if (dir.includes('right')) {
      item.width = Math.max(100, (item.startWidth ?? 0) + dx);
    }
    if (dir.includes('left')) {
      item.width = Math.max(100, (item.startWidth ?? 0) - dx);
      item.x = (item.offsetX ?? 0) + dx;
    }
    if (dir.includes('bottom')) {
      item.height = Math.max(50, (item.startHeight ?? 0) + dy);
    }
    if (dir.includes('top')) {
      item.height = Math.max(50, (item.startHeight ?? 0) - dy);
      item.y = (item.offsetY ?? 0) + dy;
    }
  }

  onResizeEnd(item: BoardItem) {
    if (!item.resizing) return;
    item.resizing = false;
    item.resizeDirection = undefined;
    // Se quiser persistir, adicione lógica aqui
  }

  // Touch drag handlers
  onTouchStart(event: TouchEvent, item: BoardItem) {
    event.preventDefault();
    const touch = event.touches[0];
    item.dragging = true;
    item.offsetX = touch.clientX - item.x;
    item.offsetY = touch.clientY - item.y;
  }

  onTouchMove(event: TouchEvent, item: BoardItem) {
    if (item.resizing) return;
    if (!item.dragging) return;
    const touch = event.touches[0];
    item.x = touch.clientX - (item.offsetX ?? 0);
    item.y = touch.clientY - (item.offsetY ?? 0);
  }

  onTouchEnd(item: BoardItem) {
    item.dragging = false;
    // Se quiser persistir, adicione lógica aqui
  }

  // Touch resize handlers
  onResizeTouchStart(event: TouchEvent, item: BoardItem, direction: string) {
    const touch = event.touches[0];
    item.resizing = true;
    item.resizeDirection = direction;
    item.resizeStartX = touch.clientX;
    item.resizeStartY = touch.clientY;
    item.startWidth = item.width;
    item.startHeight = item.height;
    item.offsetX = item.x;
    item.offsetY = item.y;
  }

  onResizeTouchMove(event: TouchEvent, item: BoardItem) {
    if (!item.resizing || !item.resizeDirection) return;
    const touch = event.touches[0];
    this.onResizeMove({ clientX: touch.clientX, clientY: touch.clientY } as any, item);
  }

  onResizeTouchEnd(item: BoardItem) {
    this.onResizeEnd(item);
  }

  // Métodos intermediários para eventos globais

  onDocumentMouseMove(event: MouseEvent, item: BoardItem) {
    this.onDragMove(event, item);
    this.onResizeMove(event, item);
  }

  onDocumentMouseUp(item: BoardItem) {
    this.onDragEnd(item);
    this.onResizeEnd(item);
  }

  onDocumentTouchMove(event: TouchEvent, item: BoardItem) {
    this.onTouchMove(event, item);
    this.onResizeTouchMove(event, item);
  }

  onDocumentTouchEnd(item: BoardItem) {
    this.onTouchEnd(item);
    this.onResizeTouchEnd(item);
  }

  saveItems(): void {
    localStorage.setItem('mini-board-items', JSON.stringify(this.items));
  }

  loadItems(): void {
    const itemsJson = localStorage.getItem('mini-board-items');
    if (itemsJson) {
      this.items = JSON.parse(itemsJson);
    }
  }

  getResizeHandleClass(direction: string): string {
    const base = 'w-3 h-3';
    const pos: Record<string, string> = {
      'top-left': 'top-0 left-0 cursor-nwse-resize',
      'top': 'top-0 left-1/2 -translate-x-1/2 cursor-ns-resize',
      'top-right': 'top-0 right-0 cursor-nesw-resize',
      'right': 'top-1/2 right-0 -translate-y-1/2 cursor-ew-resize',
      'bottom-right': 'bottom-0 right-0 cursor-nwse-resize',
      'bottom': 'bottom-0 left-1/2 -translate-x-1/2 cursor-ns-resize',
      'bottom-left': 'bottom-0 left-0 cursor-nesw-resize',
      'left': 'top-1/2 left-0 -translate-y-1/2 cursor-ew-resize',
    };
    return `${base} ${pos[direction]} opacity-0 absolute pointer-events-auto`;
  }
}
