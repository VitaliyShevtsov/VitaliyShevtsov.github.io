import { componentTestBed, DataTestId } from '@/test';
import AddressRow from './AddressRow';
import type { RecordRow } from '../../types';
import { act, fireEvent } from '@testing-library/react';

const getMockedRow = ({
  id = '1',
  loading = false,
  ip = '1.1.1.1',
  record = null,
}: Partial<RecordRow> = {}): RecordRow => {
  return { id, loading, ip, record };
};

describe('<AddressRow />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const fetchAddress = vi.fn(() => undefined);
  const clearRow = vi.fn(() => undefined);
  const rowNum = 1;
  const props = { rowNum, fetchAddress, clearRow };

  it('should match snapshot', () => {
    const { container } = componentTestBed(<AddressRow {...props} row={getMockedRow()} />);

    expect(container).toMatchSnapshot();
  });

  it('should not disable input and show spinner by default', () => {
    const { getByTestId, queryByTestId } = componentTestBed(<AddressRow {...props} row={getMockedRow()} />);

    expect(getByTestId(DataTestId.AddressInput)).not.toBeDisabled();
    expect(queryByTestId(DataTestId.AddressRowSpinner)).not.toBeInTheDocument();
  });

  it('should show spinner and disable input on loading', () => {
    const { getByTestId } = componentTestBed(<AddressRow {...props} row={getMockedRow({ loading: true })} />);

    expect(getByTestId(DataTestId.AddressInput)).toBeDisabled();
    expect(getByTestId(DataTestId.AddressRowSpinner)).toBeInTheDocument();
  });

  it('should show address info stack if record is not empty', () => {
    const mockRecord = {
      country: 'Australia',
      city: 'Brisbane',
      flag: {
        img: 'https://cdn.ipwhois.io/flags/au.svg',
        emoji: '\ud83c\udde6\ud83c\uddfa',
        emoji_unicode: 'U+1F1E6 U+1F1FA',
      },
      timezone: {
        id: 'Australia/Brisbane',
        abbr: 'AEST',
        is_dst: false,
        offset: 36000,
        utc: '+10:00',
        current_time: '2025-07-28T01:29:21+10:00',
      },
    };

    const { getByTestId } = componentTestBed(<AddressRow {...props} row={getMockedRow({ record: mockRecord })} />);

    expect(getByTestId(DataTestId.AddressInfoStack)).toBeInTheDocument();
  });

  it('should fetch address if entered a valid IP', () => {
    const row = getMockedRow();
    const { getByTestId } = componentTestBed(<AddressRow {...props} row={row} />);
    const input = getByTestId(DataTestId.AddressInput);
    const ip = '213.134.191.18';

    act(() => {
      fireEvent.change(input, { target: { value: ip } });
      fireEvent.blur(input);
    });

    expect(clearRow).toHaveBeenCalledOnce();

    expect(fetchAddress).toHaveBeenCalledOnce();
    expect(fetchAddress).toHaveBeenCalledWith(ip, row.id);
  });

  it('should not fetch and clear row if IP is the same', () => {
    const row = getMockedRow();
    const { getByTestId } = componentTestBed(<AddressRow {...props} row={row} />);
    const input = getByTestId(DataTestId.AddressInput);
    const ip = '1.1.1.1';

    act(() => {
      fireEvent.change(input, { target: { value: ip } });
      fireEvent.blur(input);
    });

    expect(clearRow).not.toHaveBeenCalledOnce();
    expect(fetchAddress).not.toHaveBeenCalledOnce();
  });
});
