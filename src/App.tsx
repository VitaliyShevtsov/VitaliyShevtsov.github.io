import { useCallback, useRef, useState } from 'react';
import styles from './App.module.css';
import { useNotesStore } from './hooks';
import type { NoteColor } from './types';

function App() {
  const { notes, addNote } = useNotesStore();
  const [selectedColor, setSelectedColor] = useState<NoteColor>('yellow');
  const boardRef = useRef<HTMLDivElement>(null);

  const handleBoardClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = boardRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addNote(x, y, selectedColor);
    },
    [addNote, selectedColor],
  );

  return (
    <div className={styles.app}>
      <div className={styles.board} ref={boardRef} onClick={handleBoardClick}>
        {notes.map((note) => (
          <div key={note.id}>note</div>
        ))}
      </div>
    </div>
  );
}

export default App;
