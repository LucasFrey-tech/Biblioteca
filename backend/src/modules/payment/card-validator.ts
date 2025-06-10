export function validateCard(cardDetails: {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}): { isValid: boolean; message?: string } {
  // Basic validation
  if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc || !cardDetails.name) {
    return { isValid: false, message: 'All card details are required' };
  }

  // Simple card number validation (Luhn algorithm would be better in production)
  const cleanedNumber = cardDetails.number.replace(/\s+/g, '');
  if (!/^\d{16}$/.test(cleanedNumber)) {
    return { isValid: false, message: 'Invalid card number' };
  }

  // Expiry date validation
  const [month, year] = cardDetails.expiry.split('/').map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (
    isNaN(month) || isNaN(year) ||
    month < 1 || month > 12 ||
    year < currentYear || (year === currentYear && month < currentMonth)
  ) {
    return { isValid: false, message: 'Invalid expiry date' };
  }

  // CVC validation
  if (!/^\d{3,4}$/.test(cardDetails.cvc)) {
    return { isValid: false, message: 'Invalid CVC' };
  }

  return { isValid: true };
}