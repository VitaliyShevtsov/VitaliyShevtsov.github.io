import { memo, useEffect, useState, type FocusEventHandler } from 'react';
import type { RecordRow } from '../../types';
import { Box, Field, Image, Input, Spinner, Stack } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import AddressClock from '../AddressClock';

import './AddressRow.css';

interface Props {
  readonly row: RecordRow;
  readonly fetchAddress: (ip: string, id: number) => void;
}

const AddressRow: React.FC<Props> = ({ row, fetchAddress }) => {
  const [loading, setLoading] = useState(false);

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (!value.trim()) {
      return;
    }

    setLoading(true);
    fetchAddress(value, row.id);
  };

  useEffect(() => {
    if (row.record) {
      setLoading(false);
    }
  }, [row]);

  return (
    <li className="list-item">
      <Stack direction="row" alignItems={'center'}>
        <div className="list-item-marker">{row.id}</div>

        <Field.Root flex={'1 1 70%'} invalid={false}>
          <Input disabled={loading} type="text" placeholder="0.0.0.0" onBlur={handleInputBlur} />
          <Field.ErrorText>This field is required</Field.ErrorText>
        </Field.Root>

        <Box flex={'1 1 130px'}>
          {loading ? <Spinner size="md" /> : null}
          {!loading && row.record ? (
            <Stack direction="row" alignItems="center">
              <Tooltip content={row.record.country}>
                <Image height="30px" src={row.record.flag.img} />
              </Tooltip>

              <AddressClock timezone={row.record.timezone} />
            </Stack>
          ) : null}
        </Box>
      </Stack>
    </li>
  );
};

export default memo(AddressRow);
