import type { AddressRecordTimezone } from '../../types';
import { useClockStore } from '../../store';

interface Props {
  readonly timezone: AddressRecordTimezone;
}

const AddressClock: React.FC<Props> = ({ timezone }) => {
  const { time } = useClockStore();

  return (
    <div>
      {time}, {timezone.offset}
    </div>
  );
};

export default AddressClock;
