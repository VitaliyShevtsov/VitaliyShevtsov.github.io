import styles from './AddressList.module.css';
import AddressRow from '../AddressRow';
import { useAddressLookupStore, useClockStore } from '../../store';
import { useEffect } from 'react';
import { DataTestId } from '@/test';

const AddressList: React.FC = () => {
  const rows = useAddressLookupStore((state) => state.rows);
  const clearRow = useAddressLookupStore((state) => state.clearRow);
  const fetchAddress = useAddressLookupStore((state) => state.fetchAddress);
  const enableInterval = useClockStore((state) => state.enableInterval);
  const clearInterval = useClockStore((state) => state.clearInterval);

  useEffect(() => {
    enableInterval();

    return () => clearInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {rows?.length ? (
        <ul className={styles.list} data-testid={DataTestId.AddressList}>
          {rows.map((row, i) => (
            <AddressRow key={row.id} rowNum={i + 1} row={row} clearRow={clearRow} fetchAddress={fetchAddress} />
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default AddressList;
