import type { NoteColor, NoteColorProps } from './types';

export const NOTE_COLORS: Record<NoteColor, NoteColorProps> = {
  yellow: { bg: '#fff9b1', border: '#f0e68c' },
  pink: { bg: '#ffcce5', border: '#f0a0c0' },
  blue: { bg: '#d0e8ff', border: '#a0c4e8' },
  green: { bg: '#c8f7c5', border: '#a0d89e' },
  orange: { bg: '#ffe0b2', border: '#f0c080' },
};

export const NOTE_MIN_WIDTH = 120;
export const NOTE_MIN_HEIGHT = 80;
export const NOTE_DEFAULT_WIDTH = 200;
export const NOTE_DEFAULT_HEIGHT = 180;

export const TRASH_ZONE_ID = 'trash-zone';
