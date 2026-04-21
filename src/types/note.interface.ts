import type { NoteColor } from './note-color.type';

export interface Note {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly color: NoteColor;
  readonly text: string;
  readonly zIndex: number;
}
