import type { AddressRecord } from './address-record.interface';

export interface RecordRow {
  readonly id: string;
  readonly loading: boolean;
  readonly ip?: string;
  readonly record?: AddressRecord | null;
}
