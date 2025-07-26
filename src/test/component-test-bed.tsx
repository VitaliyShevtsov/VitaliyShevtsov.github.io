import { Provider } from '@/components/ui/provider';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';

export const componentTestBed = (ui: ReactNode) => {
  const renderResult = render(<Provider>{ui}</Provider>);

  return { ...renderResult };
};
