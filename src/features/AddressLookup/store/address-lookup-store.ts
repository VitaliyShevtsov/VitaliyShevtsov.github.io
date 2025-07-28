import { create } from 'zustand';
import { ApiService } from '../../../api';
import type { AddressRecord, RecordRow } from '../types';
import { toaster } from '@/components/ui/toaster';
import { generateId } from '../helpers';

interface AddressLookupStoreState {
  readonly rows: RecordRow[] | null;
  readonly addBlankRow: () => void;
  readonly clearRow: (id: string) => void;
  readonly fetchAddress: (ip: string, id: string) => void;
}

interface ResponseParams {
  readonly fields: string;
}

export const useAddressLookupStore = create<AddressLookupStoreState>((set) => ({
  rows: null,

  addBlankRow: () => {
    return set((state) => {
      const newRow: RecordRow = { id: generateId(), loading: false };
      const rows: RecordRow[] = !state.rows ? [newRow] : [...state.rows, newRow];

      return { ...state, rows };
    });
  },

  fetchAddress: (ip: string, id: string): void => {
    const params: ResponseParams = {
      fields: 'country,city,timezone,flag',
    };

    const next = (partialRecord: Partial<RecordRow>) => {
      return set((state) => ({
        ...state,
        rows: state.rows?.map((row): RecordRow => (row.id === id ? { ...row, ...partialRecord, ip } : row)),
      }));
    };

    next({ loading: true });

    ApiService.get<AddressRecord, ResponseParams>(ip, params).then((response) => {
      const isEmptyArray = response?.data instanceof Array;

      if (isEmptyArray) {
        toaster.warning({
          description: 'IP not found',
          type: 'info',
          closable: true,
        });

        return next({ loading: false, record: null });
      }

      return next({ record: response?.data, loading: false });
    });
  },

  clearRow: (id: string): void => {
    return set((state) => ({
      ...state,
      rows: state.rows?.map((row): RecordRow => (row.id === id ? { id, loading: false } : row)),
    }));
  },
}));
