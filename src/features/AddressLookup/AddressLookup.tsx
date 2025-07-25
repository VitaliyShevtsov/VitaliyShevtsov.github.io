import { Button, Heading, Text } from '@chakra-ui/react';
import AddressRow from './components/AddressRow';
import { useAddressLookupStore, useClockStore } from './store';
import { AiOutlinePlus } from 'react-icons/ai';
import { useEffect } from 'react';

const AddressLookup: React.FC = () => {
  const { rows, addBlankRow, fetchAddress } = useAddressLookupStore();
  const clockContext = useClockStore();

  useEffect(() => {
    clockContext.enableInterval();

    return () => clockContext.clearInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Heading size="md">Address Lookup Feature</Heading>
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
