import { NOTE_DEFAULT_HEIGHT, NOTE_DEFAULT_WIDTH } from '@/constants';
import type { Note, NoteColor } from '@/types';
import { useCallback, useReducer } from 'react';

type Action = {
  type: 'ADD';
  payload: Pick<Note, 'x' | 'y' | 'color'>;
};

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
    default:
      return state;
  }
}

export function useNotesStore() {
  const [notes, dispatch] = useReducer(reducer, []);

  const addNote = useCallback(
    (x: number, y: number, color: NoteColor) =>
      dispatch({ type: 'ADD', payload: { x, y, color } }),
    [],
  );

  return { notes, addNote };
}
