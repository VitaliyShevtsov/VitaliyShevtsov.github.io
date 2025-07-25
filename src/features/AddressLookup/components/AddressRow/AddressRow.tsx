import { memo, useCallback, useState, type FocusEventHandler } from 'react';
import type { RecordRow } from '../../types';
import { Box, Field, Image, Input, Spinner, Stack } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import AddressClock from '../AddressClock';
import styles from './AddressRow.module.css';

import { useAddressValidator } from './useAddressValidator';

interface Props {
  readonly row: RecordRow;
  readonly fetchAddress: (ip: string, id: number) => void;
}

const AddressRow: React.FC<Props> = ({ row, fetchAddress }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = useAddressValidator();

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = event.target.value.trim();
      const { valid, message } = validate(value);

      if (valid) {
        setErrorMessage(null);
        fetchAddress(value, row.id);
      } else {
        setErrorMessage(message!);
      }
    },
    [fetchAddress, row.id, validate]
  );

  return (
    <li className={styles.listItem}>
      <Stack direction="row" alignItems="flex-start">
        <Box className={styles.listItemMarker}>{row.id}</Box>

        <Field.Root flex={'1 1 70%'} invalid={Boolean(errorMessage)}>
          <Input disabled={row.loading} type="text" placeholder="0.0.0.0" onBlur={handleInputBlur} />
          <Field.ErrorText>{errorMessage}</Field.ErrorText>
        </Field.Root>

        <Box flex={'1 1 130px'}>
          {row.loading ? <Spinner size="md" /> : null}
          {!row.loading && row.record ? (
            <Stack direction="row" alignItems="center">
              <Tooltip content={row.record.country}>
                <Image boxShadow="sm" height="30px" src={row.record.flag.img} />
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
