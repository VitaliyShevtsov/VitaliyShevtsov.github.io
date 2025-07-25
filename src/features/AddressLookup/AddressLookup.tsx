import { Box, Button, Heading, Text } from '@chakra-ui/react';
import AddressRow from './components/AddressRow';
import { useAddressLookupStore } from './store';
import { AiOutlinePlus } from 'react-icons/ai';

import './AddressLookup.css';

const AddressLookup: React.FC = () => {
  const { rows, addBlankRow, fetchAddress } = useAddressLookupStore();

  return (
    <Box>
      <Box marginBottom="0.75rem">
        <Heading size="xl">Address Lookup Feature</Heading>
        <Text>Enter one or more IP addresses and get their country</Text>
        <Button colorPalette="cyan" variant="solid" onClick={() => addBlankRow()}>
          <AiOutlinePlus /> Add
        </Button>
      </Box>

      {rows?.length ? (
        <ul className='list'>
          {rows.map((row) => (
            <AddressRow key={row.id} row={row} fetchAddress={fetchAddress} />
          ))}
        </ul>
      ) : null}
    </Box>
  );
};

export default AddressLookup;
