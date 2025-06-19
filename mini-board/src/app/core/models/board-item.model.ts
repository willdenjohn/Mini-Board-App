export type ItemType = 'note' | 'card' | 'shape' | 'image';

export interface BoardItem {
  id: number;
  type: ItemType;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  text?: string;
  shapeType?: 'rectangle' | 'circle' | 'triangle';
  imageUrl?: string;

  // Propriedades auxiliares para drag/resize
  dragging?: boolean;
  offsetX?: number;
  offsetY?: number;
  resizing?: boolean;
  resizeStartX?: number;
  resizeStartY?: number;
  startWidth?: number;
  startHeight?: number;
  resizeDirection?: string;
}

