import { memo, useCallback, useState, type FocusEventHandler } from 'react';
import type { RecordRow } from '../../types';
import { Box, Field, Image, Input, Spinner, Stack } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import AddressClock from '../AddressClock';
import styles from './AddressRow.module.css';

import { useAddressValidator } from './useAddressValidator';
import { DataTestId } from '@/test';

interface Props {
  readonly rowNum: number;
  readonly row: RecordRow;
  readonly fetchAddress: (ip: string, id: string) => void;
  readonly clearRow: (id: string) => void;
}

const AddressRow: React.FC<Props> = ({ rowNum, row, fetchAddress, clearRow }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const validate = useAddressValidator();

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = event.target.value.trim();

      if (value === row.ip) {
        return;
      }

      clearRow(row.id);
      const { valid, message } = validate(value);

      if (valid) {
        setErrorMessage(null);
        fetchAddress(value, row.id);
      } else {
        setErrorMessage(message!);
      }
    },
    [fetchAddress, validate, clearRow, row.id, row.ip]
  );

  return (
    <li className={styles.listItem}>
      <Stack direction="row" alignItems="center" paddingBottom="14px">
        <Box className={styles.listItemMarker}>{rowNum}</Box>

        <Field.Root flex={'1 1 70%'} invalid={Boolean(errorMessage)}>
          <Input
            disabled={row.loading}
            type="text"
            placeholder="0.0.0.0"
            data-testid={DataTestId.AddressInput}
            onBlur={handleInputBlur}
          />
          <Field.ErrorText position="absolute" bottom="-20px">
            {errorMessage}
          </Field.ErrorText>
        </Field.Root>

        <Box flex={'0 1 110px'}>
          {row.loading ? <Spinner size="md" data-testid={DataTestId.AddressRowSpinner} /> : null}
          {!row.loading && row.record ? (
            <Stack direction="row" alignItems="center" data-testid={DataTestId.AddressInfoStack}>
              <Tooltip content={`${row.record.city}, ${row.record.country}`}>
                <Image cursor="pointer" boxShadow="sm" height="30px" src={row.record.flag.img} />
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
