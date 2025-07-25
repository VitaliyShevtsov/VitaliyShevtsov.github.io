import { create } from 'zustand';
import { ApiService } from '../../../api';
import type { AddressRecord, RecordRow } from '../types';
import { toaster } from '@/components/ui/toaster';

interface AddressLookupStoreState {
  readonly rows: RecordRow[] | null;
  readonly currId: number;
  readonly addBlankRow: () => void;
  readonly fetchAddress: (ip: string, id: number) => void;
}

interface ResponseParams {
  readonly fields: string;
}

export const useAddressLookupStore = create<AddressLookupStoreState>((set) => ({
  rows: null,
  currId: 1,

  addBlankRow: () => {
    return set((state) => {
      const newRow: RecordRow = { id: state.currId, loading: false };
      const rows: RecordRow[] = !state.rows ? [newRow] : [...state.rows, newRow];

      return { ...state, rows, currId: state.currId + 1 };
    });
  },

  fetchAddress: (ip: string, id: number): void => {
    const params: ResponseParams = {
      fields: 'country,timezone,flag',
    };

    const next = (partialRecord: Partial<RecordRow> = { loading: false }) => {
      return set((state) => {
        return {
          ...state,
          rows: state.rows?.map((row): RecordRow => (row.id === id ? { ...row, ...partialRecord, ip } : row)),
        };
      });
    };

    next({ loading: true });

    ApiService.get<AddressRecord, ResponseParams>(ip, params).then((response) => {
      const isEmptyArray = response.data instanceof Array;

      if (isEmptyArray) {
        console.log('empty');

        toaster.warning({
          description: 'IP not found',
          type: 'info',
          closable: true,
        });

        return next({ loading: false });
      }

      return next({ record: response.data, loading: false });
    });
  },
}));
