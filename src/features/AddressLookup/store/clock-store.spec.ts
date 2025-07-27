import { renderHook } from '@testing-library/react';
import { useClockStore } from './clock-store';
import { act } from 'react';

describe('useClockStore', () => {
  it('should match initial state', () => {
    const { result } = renderHook(() => useClockStore());

    expect(result.current.interval).toBeNull();
    expect(result.current.date).toBeInstanceOf(Date);
  });

  it('should set interval', () => {
    const { result } = renderHook(() => useClockStore());

    expect(result.current.interval).toBeNull();

    act(() => {
      result.current.enableInterval();
    });

    expect(result.current.interval).toBeTruthy();
  });

  it('should clear interval', () => {
    const { result } = renderHook(() => useClockStore());

    expect(result.current.interval).toBeNull();

    act(() => {
      result.current.enableInterval();
    });

    expect(result.current.interval).toBeTruthy();

    act(() => {
      result.current.clearInterval();
    });

    expect(result.current.interval).toBeNull();
  });
});
