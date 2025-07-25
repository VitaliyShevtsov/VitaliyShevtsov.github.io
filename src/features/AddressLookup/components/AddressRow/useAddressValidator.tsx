import isMyIpValid from 'is-my-ip-valid';
import { ValidationMessage } from './validation-message';

type ValidationResult = { valid: boolean; message?: string };

export function useAddressValidator() {
  const validator = (value: string): ValidationResult => {
    const validate = isMyIpValid();

    if (!value) {
      return { valid: false, message: ValidationMessage.blankValue };
    }

    if (validate(value)) {
      return { valid: true };
    }

    return { valid: false, message: ValidationMessage.invalidIP };
  };

  return validator;
}
