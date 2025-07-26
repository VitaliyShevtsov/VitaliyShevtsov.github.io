import { describe, expect } from 'vitest';
import { useAddressValidator } from './useAddressValidator';
import { ValidationMessage } from './validation-message';

describe('useAddressValidator', () => {
  test.each`
    ip                                                | expectedValue | expectedMessage
    ${'1.1.1.1'}                                      | ${true}       | ${undefined}
    ${'1.1.1.01'}                                     | ${false}      | ${ValidationMessage.invalidIP}
    ${'2001:0db8:85a3:0000:0000:8a2e:0370:7334'}      | ${true}       | ${undefined}
    ${'2001:db8:85a3::8a2e:370:7334'}                 | ${true}       | ${undefined}
    ${'2001:0db8:85a3:0000:0000:8a2e:0370:7334:1234'} | ${false}      | ${ValidationMessage.invalidIP}
    ${undefined}                                      | ${false}      | ${ValidationMessage.blankValue}
    ${''}                                             | ${false}      | ${ValidationMessage.blankValue}
  `(
    `should return $expectedValue and $expectedMessage message if $ip passed`,
    ({ ip, expectedValue, expectedMessage }) => {
      const validator = useAddressValidator();
      const result = validator(ip);

      expect(result.valid).toBe(expectedValue);
      expect(result.message).toBe(expectedMessage);
    }
  );
});
