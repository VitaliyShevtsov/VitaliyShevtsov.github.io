import type { AddressRecordFlag } from './address-record-flag.interface';
import type { AddressRecordTimezone } from './address-record-timezone.interface';

export interface AddressRecord {
  readonly country: string;
  readonly city: string;
  readonly flag: AddressRecordFlag;
  readonly timezone: AddressRecordTimezone;
}
