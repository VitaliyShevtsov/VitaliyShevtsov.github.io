import { Box, Button, Heading, Text } from '@chakra-ui/react';

import AddressList from './components/AddressList';
import { useAddressLookupStore } from './store';
import { AiOutlinePlus } from 'react-icons/ai';

const AddressLookup: React.FC = () => {
  const addBlankRow = useAddressLookupStore((state) => state.addBlankRow);

  return (
    <Box>
      <Box marginBottom="0.75rem">
        <Heading size="xl">Address Lookup Feature</Heading>
        <Text>Enter one or more IP addresses and get their country</Text>
        <Button colorPalette="cyan" variant="solid" onClick={addBlankRow}>
          <AiOutlinePlus /> Add
        </Button>
      </Box>

      <AddressList />
    </Box>
  );
};

export default AddressLookup;
