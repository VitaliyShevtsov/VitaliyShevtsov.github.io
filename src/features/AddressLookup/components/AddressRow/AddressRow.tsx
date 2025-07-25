import { memo, useState, type FocusEventHandler } from 'react';
import type { BlankRow } from '../../types';

interface Props {
  readonly row: BlankRow;
  readonly fetchAddress: (ip: string, id: number) => void;
}

const AddressRow: React.FC<Props> = ({ row, fetchAddress }) => {
  const [loading, setLoading] = useState(false);

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    setLoading(true);
    fetchAddress(value, row.id);
  };

  return (
    <li>
      <div>{row.id}</div>
      <input type="text" disabled={loading} placeholder="0.0.0.0" onBlur={handleInputBlur} />
      {loading ? <span>spinner</span> : null}
    </li>
  );
};

export default memo(AddressRow);
