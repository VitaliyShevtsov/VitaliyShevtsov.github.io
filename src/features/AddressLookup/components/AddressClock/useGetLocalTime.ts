import type { AddressRecordTimezone } from '../../types';

export function useGetLocalTime() {
  return (date: Date, timezone: AddressRecordTimezone) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: timezone.utc,
    });
  };
}
