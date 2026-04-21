import { NOTE_DEFAULT_HEIGHT, NOTE_DEFAULT_WIDTH } from '@/constants';
import type { Note, NoteColor } from '@/types';
import { useCallback, useReducer } from 'react';

type Action =
  | { type: 'ADD'; payload: Pick<Note, 'x' | 'y' | 'color'> }
  | { type: 'MOVE'; payload: Pick<Note, 'id' | 'x' | 'y'> }
  | { type: 'BRING_TO_FRONT'; payload: string };

let nextZIndex = 1;

function reducer(state: Note[], action: Action): Note[] {
  switch (action.type) {
    case 'ADD': {
      const { x, y, color } = action.payload;
      const note: Note = {
        id: crypto.randomUUID(),
        x,
        y,
        width: NOTE_DEFAULT_WIDTH,
        height: NOTE_DEFAULT_HEIGHT,
        color,
        text: '',
        zIndex: nextZIndex++,
      };

      return [...state, note];
    }
    case 'MOVE': {
      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, x: action.payload.x, y: action.payload.y }
          : note,
      );
    }
    case 'BRING_TO_FRONT': {
      return state.map((note) =>
        note.id === action.payload ? { ...note, zIndex: nextZIndex++ } : note,
      );
    }
    default:
      return state;
  }
}

export function useNotesStore() {
  const [notes, dispatch] = useReducer(reducer, []);

  const addNote = useCallback((x: number, y: number, color: NoteColor) => {
    dispatch({ type: 'ADD', payload: { x, y, color } });
  }, []);

  const moveNote = useCallback((id: string, x: number, y: number) => {
    dispatch({ type: 'MOVE', payload: { id, x, y } });
  }, []);

  const bringToFront = useCallback((id: string) => {
    dispatch({ type: 'BRING_TO_FRONT', payload: id });
  }, []);

  return { notes, addNote, moveNote, bringToFront };
}
