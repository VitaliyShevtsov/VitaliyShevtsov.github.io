import { Button, Heading, Text } from '@chakra-ui/react';
import AddressRow from './components/AddressRow';
import { useAddressLookupStore } from './store';
import { AiOutlinePlus } from 'react-icons/ai';

const AddressLookup: React.FC = () => {
  const { rows, addBlankRow, fetchAddress } = useAddressLookupStore();

  return (
    <div>
      <Heading size="xl">Address Lookup Feature</Heading>
      <Text>Enter one or more IP addresses and get their country</Text>
      <Button colorPalette="teal" variant="solid" onClick={() => addBlankRow()}>
        <AiOutlinePlus /> Add
      </Button>
      {rows?.length ? (
        <ul>
          {rows.map((row) => (
            <AddressRow key={row.id} row={row} fetchAddress={fetchAddress} />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default AddressLookup;
