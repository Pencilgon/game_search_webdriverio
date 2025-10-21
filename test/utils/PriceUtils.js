/**
 * Normalize a price string to a float number.
 * E.g., "$12.99", "€13,99", "14.50 USD" => 12.99, 13.99, 14.5
 * @param {string} text
 * @returns {number}
 */
function normalizePrice(text) {
  if (!text) return 0;
  const numericText = text.replace(/[^0-9.,]/g, '').replace(',', '.');
  const value = parseFloat(numericText);
  return Number.isNaN(value) ? 0 : value;
}

/**
 * Strips all non-digit characters, including '.' and ',' from the input.
 * E.g., "$12.99" => "1299", "€1,299.00" => "129900"
 * @param {string} text
 * @returns {string}
 */
function stripToDigits(text) {
  if (!text) return '';
  return text.replace(/\D/g, '');
}

export default {
  normalizePrice,
  stripToDigits,
};
