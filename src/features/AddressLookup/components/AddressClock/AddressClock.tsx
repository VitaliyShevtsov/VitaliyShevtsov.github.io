import type { AddressRecordTimezone } from '../../types';
import { useClockStore } from '../../store';
import { useCallback } from 'react';

interface Props {
  readonly timezone: AddressRecordTimezone;
}

const AddressClock: React.FC<Props> = ({ timezone }) => {
  const { date } = useClockStore();

  const getCurrentTime = useCallback(() => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timezone.utc,
    });
  }, [timezone, date]);

  return <div>{getCurrentTime()}</div>;
};

export default AddressClock;
