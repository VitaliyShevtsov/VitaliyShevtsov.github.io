import { NOTE_COLORS } from '@/constants';
import type { Note } from '@/types';
import styles from './StickyNote.module.css';

interface Props {
  readonly note: Note;
}

export function StickyNote({ note }: Props) {
  const colors = NOTE_COLORS[note.color];

  return (
    <div
      className={styles.note}
      style={{
        left: note.x,
        top: note.y,
        width: note.width,
        height: note.height,
        zIndex: note.zIndex,
        backgroundColor: colors.bg,
        borderColor: colors.border,
      }}
    >
      {note.text || 'New note'}
    </div>
  );
}
