import { componentTestBed } from '@/test';
import AddressLookup from './AddressLookup';

describe('<AddressLookup />', () => {
  it('should match snapshot', () => {
    const { container } = componentTestBed(<AddressLookup />);

    expect(container).toMatchSnapshot();
  });
});
