import type { Note } from '@/types';

const STORAGE_KEY = 'notes';

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Note[];
  } catch (error) {
    console.error('Failed to load notes:', error);
  }
  return [];
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
