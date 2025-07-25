
interface ValidationResult {
  readonly valid: boolean;
  readonly message?: string;
}

export function useAddressValidate(): (value: string) => ValidationResult {
  const validator = (value: string) => {
    const parts = value.split(/[.:]/);

    const validator = ipValidator();

    console.log(validator('2001:0db8:85a3:0000:0000:8a2e:0370:7334'))

    if (parts.length === 4) {
      for (const part of parts) {
        const num = parseInt(part);
        if (isNaN(num) || num < 0 || num > 255) {
          return { valid: false };
        }
      }
      return { valid: true };
    } else if (parts.length === 8) {
      for (const part of parts) {
        if (!/^[0-9a-fA-F]{1,4}$/.test(part)) {
          return { valid: false };
        }
      }
      return { valid: true };
    }

    return { valid: false };
  };

  return validator;
}


