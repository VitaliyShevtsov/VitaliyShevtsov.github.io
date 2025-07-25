import AddressRow from './components/AddressRow';

const AddressLookup: React.FC = () => {
  return (
    <div>
      <h1>Address Lookup Feature</h1>
      <p>Enter one or more IP addresses and get their country</p>
      <button>+ Add</button>
      <ol>
        <AddressRow />
        <AddressRow />
        <AddressRow />
      </ol>
    </div>
  );
};

export default AddressLookup;
