import type { AddressRecordTimezone } from '../../types';
import { useClockStore } from '../../store';
import { Text } from '@chakra-ui/react';
import { useGetLocalTime } from './useGetLocalTime';

interface Props {
  readonly timezone: AddressRecordTimezone;
}

const AddressClock: React.FC<Props> = ({ timezone }) => {
  const date = useClockStore((state) => state.date);
  const getCurrentTime = useGetLocalTime();

  return <Text>{getCurrentTime(date, timezone.utc)}</Text>;
};

export default AddressClock;
