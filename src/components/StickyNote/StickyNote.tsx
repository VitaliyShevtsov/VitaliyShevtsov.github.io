import { NOTE_COLORS } from '@/constants';
import type { Note } from '@/types';
import styles from './StickyNote.module.css';
import { useDrag } from '@/hooks';
import { useState } from 'react';

interface Props {
  readonly note: Note;
  readonly onMove: (id: string, x: number, y: number) => void;
  readonly onBringToFront: (id: string) => void;
}

export function StickyNote({ note, onMove, onBringToFront }: Props) {
  const colors = NOTE_COLORS[note.color];
  const [localCords, setLocalCords] = useState({
    x: note.x,
    y: note.y,
  });

  const moveDrag = useDrag({
    onDragStart: () => {
      onBringToFront(note.id);
    },
    onDragMove: (dx, dy) => {
      setLocalCords(() => ({ x: note.x + dx, y: note.y + dy }));
    },
    onDragEnd: (e) => {
      onMove(note.id, e.clientX, e.clientY);
    },
  });

  return (
    <div
      className={styles.note}
      style={{
        left: localCords.x,
        top: localCords.y,
        width: note.width,
        height: note.height,
        zIndex: note.zIndex,
        backgroundColor: colors.bg,
        borderColor: colors.border,
      }}
    >
      <div className={styles.noteHeader} onPointerDown={moveDrag}></div>
      <div>{note.text || 'New note'}</div>
    </div>
  );
}
