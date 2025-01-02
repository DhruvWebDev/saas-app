import crypto from 'crypto';

// The encryption key should be a 32-byte (256-bit) key
// IMPORTANT: Store this key securely in your environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// Initialization Vector length for AES-256-CBC
const IV_LENGTH = 16;

/**
 * Encrypts a string using AES-256-CBC encryption.
 * @param text - The string to encrypt
 * @returns The encrypted string in the format: iv:encryptedData (both in hex)
 */
export function encrypt(text: string): string {
  if (!ENCRYPTION_KEY) {
    throw new Error('Encryption key is not set');
  }

  // Generate a random initialization vector
  const iv = crypto.randomBytes(IV_LENGTH);

  // Create cipher with key and iv
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

  // Encrypt the text
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return iv and encrypted data as hex strings
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts a string that was encrypted with the encrypt function.
 * @param encryptedText - The encrypted string in the format: iv:encryptedData (both in hex)
 * @returns The decrypted string
 */
export function decrypt(encryptedText: string): string {
  if (!ENCRYPTION_KEY) {
    throw new Error('Encryption key is not set');
  }

  // Split iv and encrypted data
  const [ivHex, encryptedData] = encryptedText.split(':');

  if (!ivHex || !encryptedData) {
    throw new Error('Invalid encrypted text format');
  }

  // Convert iv from hex to Buffer
  const iv = Buffer.from(ivHex, 'hex');

  // Create decipher with key and iv
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

  // Decrypt the data
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}