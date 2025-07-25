import type { AddressRecord } from './address-record.interface';

export interface RecordRow {
  readonly id: number;
  readonly loading: boolean;
  readonly ip?: string;
  readonly record?: AddressRecord | null;
}
