import { componentTestBed } from '@/test';
import App from './App';

describe('<App />', () => {
  it('should match snapshot', () => {
    const { container } = componentTestBed(<App />);

    expect(container).toMatchSnapshot();
  });
});
