import { componentTestBed, DataTestId } from '@/test';
import AddressList from './AddressList';
import { renderHook } from '@testing-library/react';
import { useAddressLookupStore } from '../../store';
import { act } from 'react';

describe('<AddressList />', () => {
  it('should match snapshot', () => {
    const { container } = componentTestBed(<AddressList />);

    expect(container).toMatchSnapshot();
  });

  it('should not render list if there is no rows', () => {
    const { queryByTestId } = componentTestBed(<AddressList />);

    expect(queryByTestId(DataTestId.AddressList)).not.toBeInTheDocument()
  });

  it('should render 2 blank rows', () => {
    const { getByTestId } = componentTestBed(<AddressList />);
    const { result } = renderHook(() => useAddressLookupStore());

    act(() => {
      result.current.addBlankRow();
      result.current.addBlankRow();
    });

    expect(getByTestId(DataTestId.AddressList).children.length).toEqual(2);
  });
});
