interface Note {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
   type: 'note'; 
  dragging?: boolean;
  offsetX?: number;
  offsetY?: number;
  resizing?: boolean;
  resizeStartX?: number;
  resizeStartY?: number;
  startWidth?: number;
  startHeight?: number;
  resizeDirection?: string;
  color?: string;
}