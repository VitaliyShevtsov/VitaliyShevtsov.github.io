import AddressRow from './components/AddressRow';
import { useAddressLookupStore } from './store';

const AddressLookup: React.FC = () => {
  const { rows, addBlankRow, fetchAddress } = useAddressLookupStore();

  return (
    <div>
      <h1>Address Lookup Feature</h1>
      <p>Enter one or more IP addresses and get their country</p>
      <button onClick={() => addBlankRow()}>+ Add</button>
      {rows?.length ? (
        <ol>
          {rows.map((row) => (
            <AddressRow key={row.id} row={row} fetchAddress={fetchAddress} />
          ))}
        </ol>
      ) : null}
    </div>
  );
};

export default AddressLookup;
