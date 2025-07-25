import type { AddressRecord } from './address-record.interface';

export interface RecordRow {
  readonly id: number;
  readonly ip?: string;
  readonly record?: AddressRecord;
}
