import { componentTestBed } from '@/test';
import AddressList from './AddressList';

describe('<AddressList />', () => {
  it('should match snapshot', () => {
    const { container } = componentTestBed(<AddressList />);

    expect(container).toMatchSnapshot();
  });
});
