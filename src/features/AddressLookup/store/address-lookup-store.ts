import { create } from 'zustand';
import { ApiService } from '../../../api';
import type { AddressRecord, RecordRow } from '../types';

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
      const newRow: RecordRow = { id: state.currId };
      const rows: RecordRow[] = !state.rows ? [newRow] : [...state.rows, newRow];

      return { ...state, rows, currId: state.currId + 1 };
    });
  },

  fetchAddress: (ip: string, id: number): void => {
    const params: ResponseParams = {
      fields: 'country,timezone,flag',
    };

    const next = (record: AddressRecord) => {
      return set((state) => {
        return {
          ...state,
          rows: state.rows?.map((row): RecordRow => (row.id === id ? { ...row, record, ip } : row)),
        };
      });
    };

    ApiService.get<AddressRecord, ResponseParams>(ip, params).then((response) => {
      next(response.data);
    });
  },
}));
