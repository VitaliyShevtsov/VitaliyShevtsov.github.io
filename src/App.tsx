import { useCallback, useRef, useState } from 'react';
import styles from './App.module.css';
import { useNotesStore } from './hooks';
import type { NoteColor } from './types';
import { StickyNote } from './components/StickyNote';

function App() {
  const { notes, addNote, moveNote, bringToFront } = useNotesStore();
  const [selectedColor, setSelectedColor] = useState<NoteColor>('yellow');
  const boardRef = useRef<HTMLDivElement>(null);

  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    const rect = boardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addNote(x, y, selectedColor);
  };

  return (
    <div className={styles.app}>
      <div className={styles.board} ref={boardRef} onClick={handleBoardClick}>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onMove={moveNote}
            onBringToFront={bringToFront}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
