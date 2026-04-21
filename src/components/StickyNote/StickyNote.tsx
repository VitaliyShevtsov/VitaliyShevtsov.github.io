import { NOTE_COLORS, NOTE_MIN_HEIGHT, NOTE_MIN_WIDTH } from '@/constants';
import type { Note } from '@/types';
import styles from './StickyNote.module.css';
import { useDrag } from '@/hooks';
import { useState } from 'react';

type LocalCords = Pick<Note, 'x' | 'y'>;
type LocalSize = Pick<Note, 'width' | 'height'>;

interface Props {
  readonly note: Note;
  readonly onMove: (id: string, x: number, y: number) => void;
  readonly onBringToFront: (id: string) => void;
  readonly onResize: (id: string, width: number, height: number) => void;
}

export function StickyNote({ note, onMove, onBringToFront, onResize }: Props) {
  const colors = NOTE_COLORS[note.color];
  const [localCords, setLocalCords] = useState<LocalCords>({
    x: note.x,
    y: note.y,
  });
  const [localSize, setLocalSize] = useState<LocalSize>({
    width: note.width,
    height: note.height,
  });

  const moveDrag = useDrag({
    onDragStart: () => {
      onBringToFront(note.id);
    },
    onDragMove: (dx, dy) => {
      setLocalCords({ x: note.x + dx, y: note.y + dy });
    },
    onDragEnd: (dx, dy) => {
      onMove(note.id, note.x + dx, note.y + dy);
    },
  });

  const resizeDrag = useDrag({
    onDragStart: () => {
      onBringToFront(note.id);
    },
    onDragMove: (dx, dy) => {
      const newW = Math.max(NOTE_MIN_WIDTH, note.width + dx);
      const newH = Math.max(NOTE_MIN_HEIGHT, note.height + dy);
      setLocalSize({ width: newW, height: newH });
    },
    onDragEnd: (dx, dy) => {
      const newW = Math.max(NOTE_MIN_WIDTH, note.width + dx);
      const newH = Math.max(NOTE_MIN_HEIGHT, note.height + dy);
      onResize(note.id, newW, newH);
    },
  });

  return (
    <div
      className={styles.note}
      style={{
        left: localCords.x,
        top: localCords.y,
        width: localSize.width,
        height: localSize.height,
        zIndex: note.zIndex,
        backgroundColor: colors.bg,
        borderColor: colors.border,
      }}
    >
      <div className={styles.noteHeader} onPointerDown={moveDrag}></div>
      <div>{note.text || 'New note'}</div>

      <div className={styles.noteResizeHandle} onPointerDown={resizeDrag} />
    </div>
  );
}
