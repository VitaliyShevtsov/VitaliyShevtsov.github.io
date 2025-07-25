import { create } from 'zustand';
import { ApiService } from '../../../api';
import type { BlankRow } from '../types';

interface AddressLookupStoreState {
  readonly rows: BlankRow[] | null;
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
      const newRow: BlankRow = { id: state.currId };
      const rows: BlankRow[] = !state.rows ? [newRow] : [...state.rows, newRow];

      return { ...state, rows, currId: state.currId + 1 };
    });
  },

  fetchAddress: (ip: string, id: number): void => {
    const params: ResponseParams = {
      fields: 'country,timezone,flag',
    };

    // const next = (categories: Location[]) => {
    //   return set((state) => ({ ...state, categories }));
    // };

    ApiService.get<Location[], ResponseParams>(ip, params).then((response) => console.log(id, response));
  },
}));
