import { componentTestBed } from '@/test';

import { describe, expect, it } from 'vitest';
import AddressRow from './AddressRow';

describe('<AddressRow />', () => {
  it('should match snapshot', () => {
    const rowNum = 1;
    const row = { id: 1, loading: false } as const;
    const fetchAddress = vi.fn(() => undefined);
    const clearRow = vi.fn(() => undefined);

    const props = { rowNum, row, fetchAddress, clearRow };

    const { container } = componentTestBed(<AddressRow {...props} />);

    expect(container).toMatchSnapshot();
  });
});
