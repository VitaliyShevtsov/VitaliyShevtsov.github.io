import { useCallback, useRef, useState } from 'react';
import styles from './App.module.css';
import { useNotesStore } from './hooks';
import type { NoteColor } from './types';
import { StickyNote } from './components/StickyNote';
import { Toolbar } from './components/Toolbar';
import { TrashZone } from './components/TrashZone';
import { TRASH_ZONE_ID } from './constants';

function App() {
  const { notes, addNote, moveNote, bringToFront, resizeNote, removeNote } =
    useNotesStore();
  const [selectedColor, setSelectedColor] = useState<NoteColor>('yellow');
  const boardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    const rect = boardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addNote(x, y, selectedColor);
  };

  const handleDragStateChange = useCallback(
    (id: string, dragging: boolean, pointerX?: number, pointerY?: number) => {
      setIsDragging(dragging);

      if (!dragging) {
        const el = document.getElementById(TRASH_ZONE_ID);

        if (!el) {
          return;
        }

        const rect = el.getBoundingClientRect();

        if (
          pointerX != null &&
          pointerY != null &&
          pointerX >= rect.left &&
          pointerX <= rect.right &&
          pointerY >= rect.top &&
          pointerY <= rect.bottom
        ) {
          removeNote(id);
        }
      }
    },
    [removeNote],
  );

  return (
    <div className={styles.app}>
      <Toolbar selectedColor={selectedColor} onColorChange={setSelectedColor} />
      <div className={styles.board} ref={boardRef} onClick={handleBoardClick}>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onMove={moveNote}
            onBringToFront={bringToFront}
            onResize={resizeNote}
            onDragStateChange={handleDragStateChange}
          />
        ))}
      </div>
      <TrashZone active={isDragging} />
    </div>
  );
}

export default App;
