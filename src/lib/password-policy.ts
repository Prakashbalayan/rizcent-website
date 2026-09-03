export const PASSWORD_MIN_LENGTH = 8;

export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

export function validatePassword(
  password: string,
): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`,
    );
  }

  if (!/[A-Z]/.test(password)) {
    errors.push(
      "Password must contain at least one uppercase letter.",
    );
  }

  if (!/[a-z]/.test(password)) {
    errors.push(
      "Password must contain at least one lowercase letter.",
    );
  }

  if (!/[0-9]/.test(password)) {
    errors.push(
      "Password must contain at least one number.",
    );
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push(
      "Password must contain at least one special character.",
    );
  }

  if (/\s/.test(password)) {
    errors.push(
      "Password must not contain spaces.",
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}