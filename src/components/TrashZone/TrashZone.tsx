import { TRASH_ZONE_ID } from '@/constants';
import styles from './TrashZone.module.css';

interface Props {
  readonly active: boolean;
}

export function TrashZone({ active }: Props) {
  return (
    <div
      id={TRASH_ZONE_ID}
      className={`${styles.trashZone} ${active ? styles.trashZoneActive : undefined}`}
    >
      <div className={styles.trashZoneLabel}>Drop here to delete</div>
    </div>
  );
}
