// Field validators — each returns an error string ('' = valid).

export const required = (label = 'This field') => (v) =>
  String(v ?? '').trim() ? '' : `${label} is required.`;

export const email = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v ?? '').trim())
    ? ''
    : 'Enter a valid email address.';

export const phone = (v) => {
  const digits = String(v ?? '').replace(/\D/g, '');
  if (!digits) return 'Phone number is required.';
  return digits.length >= 7 && digits.length <= 15
    ? ''
    : 'Enter a valid phone number.';
};

export const minLen = (n, label = 'This field') => (v) =>
  String(v ?? '').trim().length >= n
    ? ''
    : `${label} must be at least ${n} characters.`;

export const url = (v) => {
  const s = String(v ?? '').trim();
  if (!s) return '';
  return /^(https?:\/\/)?[\w-]+(\.[\w-]+)+.*$/.test(s)
    ? ''
    : 'Enter a valid URL.';
};

// Run a rule map { field: [rule, rule] } against values → { field: errorMsg }.
export const runValidation = (values, rules) => {
  const errors = {};
  Object.entries(rules).forEach(([field, fieldRules]) => {
    for (const rule of fieldRules) {
      const msg = rule(values[field]);
      if (msg) {
        errors[field] = msg;
        break;
      }
    }
  });
  return errors;
};
