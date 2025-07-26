import { componentTestBed } from '@/test';

import { describe, expect, it } from 'vitest';
import AddressClock from './AddressClock';
import type { AddressRecordTimezone } from '../../types';

vi.mock('../../store', () => {
  return {
    useClockStore: () => {
      return { date: new Date('2025-07-26T20:00:00+02:00') };
    },
  };
});

describe('<AddressClock />', () => {
  const mockTimeZone: AddressRecordTimezone = {
    abbr: 'CEST',
    current_time: '2025-07-26T20:00:00+02:00',
    id: 'Europe/Warsaw',
    is_dst: true,
    offset: 7200,
    utc: '+02:00',
  };

  it('should match snapshot', () => {
    const { container } = componentTestBed(<AddressClock timezone={mockTimeZone} />);

    expect(container).toMatchSnapshot();
  });
});
