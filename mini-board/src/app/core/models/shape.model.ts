export type ShapeType = 'rectangle' | 'circle' | 'triangle';

export interface Shape {
  id: number;
  shapeType: ShapeType;
  color?: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

