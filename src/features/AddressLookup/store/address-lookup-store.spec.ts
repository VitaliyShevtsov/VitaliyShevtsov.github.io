import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { useAddressLookupStore } from './address-lookup-store';
import type { Mocked } from 'vitest';
import ApiService from '@/api/api.service';
import type { AxiosResponse } from 'axios';

describe('useAddressLookupStore', () => {
  vi.mock('@/api/api.service');
  const mockedApiService = ApiService as Mocked<typeof ApiService>;

  it('should match initial state', () => {
    const { result } = renderHook(() => useAddressLookupStore());

    expect(result.current.rows).toBe(null);
  });

  describe('addBlankRow', () => {
    it('should add blank row', () => {
      const { result } = renderHook(() => useAddressLookupStore());

      act(() => {
        result.current.addBlankRow();
      });

      expect(result.current.rows).toBeInstanceOf(Array);
    });

    it('should add blank row if rows not empty', () => {
      const { result } = renderHook(() => useAddressLookupStore());

      act(() => {
        result.current.addBlankRow();
      });

      expect(result.current.rows?.length).toBe(1);

      act(() => {
        result.current.addBlankRow();
      });

      expect(result.current.rows?.length).toBe(2);
    });
  });

  describe('fetchAddress', () => {
    vi.mock('@/api/api.service');
    const mockedApiService = ApiService as Mocked<typeof ApiService>;

    beforeEach(() => {
      const { result } = renderHook(() => useAddressLookupStore());

      act(() => {
        result.current.addBlankRow();
      });
    });

    it('should fetch and set record', async () => {
      const { result } = renderHook(() => useAddressLookupStore());

      mockedApiService.get.mockReturnValue(Promise.resolve().then(() => ({ data: {} }) as AxiosResponse));

      const rows = result.current.rows!;

      expect(rows[0].record).toBeUndefined();

      await waitFor(() => {
        result.current.fetchAddress('0.0.0.0', rows[0].id);
      });

      const rows2 = result.current.rows!;

      expect(rows2[0].record).toStrictEqual({});
    });

    it('should not set record if IP not found', async () => {
      const { result } = renderHook(() => useAddressLookupStore());

      mockedApiService.get.mockReturnValue(Promise.resolve().then(() => ({ data: [] }) as AxiosResponse));

      const rows = result.current.rows!;

      expect(rows[0].record).toBeUndefined();

      await waitFor(() => {
        result.current.fetchAddress('0.0.0.0', rows[0].id);
      });

      const rows2 = result.current.rows!;

      expect(rows2[0].record).toBeNull();
    });
  });

  describe('clearRow', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useAddressLookupStore());

      act(() => {
        result.current.addBlankRow();
      });
    });

    it('should clear record from a row', async () => {
      const { result } = renderHook(() => useAddressLookupStore());

      mockedApiService.get.mockReturnValue(Promise.resolve().then(() => ({ data: {} }) as AxiosResponse));

      const rows = result.current.rows!;

      expect(rows[0].record).toBeUndefined();

      await waitFor(() => {
        result.current.fetchAddress('0.0.0.0', rows[0].id);
      });

      const row1 = result.current.rows![0];

      expect(row1.record).toBeTruthy();

      act(() => {
        result.current.clearRow(row1.id);
      });

      const row2 = result.current.rows![0];

      expect(row2.record).toBeUndefined();
    });
  });
});
