import type { NoteColor } from '@/types';
import styles from './Toolbar.module.css';
import { NOTE_COLORS } from '@/constants';

const colors = Object.keys(NOTE_COLORS) as NoteColor[];

interface Props {
  readonly selectedColor: NoteColor;
  readonly onColorChange: (color: NoteColor) => void;
}

export function Toolbar({ selectedColor, onColorChange }: Props) {
  return (
    <header className={styles.toolbar}>
      <h1 className={styles.toolbarTitle}>Notes</h1>
      <div className={styles.toolbarControls}>
        <span className={styles.toolbarLabel}>Color:</span>
        <div className={styles.toolbarColorPicker}>
          {colors.map((color) => (
            <button
              key={color}
              className={styles.toolbarColorPickerSwatch}
              style={{
                backgroundColor: NOTE_COLORS[color].bg,
                borderColor:
                  selectedColor === color
                    ? NOTE_COLORS[color].border
                    : NOTE_COLORS[color].bg,
              }}
              onClick={() => onColorChange(color)}
              title={color}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
