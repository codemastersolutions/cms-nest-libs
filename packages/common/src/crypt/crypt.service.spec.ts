import { describe, expect, it } from 'vitest';
import { CryptService } from './crypt.service';
import * as dotenv from 'dotenv';
dotenv.config();

describe('CriptService', () => {
  it('should be return a hash string', async () => {
    const cryptService = new CryptService();
    const password = 'a1b2c3d4@';
    const hash: string = await cryptService.hash(password);
    expect(hash).contains('$2b$10$');
  });
  it('should be return a hash string with custom salt rounds', async () => {
    const cryptService = new CryptService();
    const password = 'a1b2c3d4@';
    const hash: string = await cryptService.hash(password, 12);
    expect(hash).contains('$2b$12$');
  });
  it('validate a returned hash', async () => {
    const cryptService = new CryptService();
    const password = 'a1b2c3d4@';
    const hash: string = await cryptService.hash(password);
    const isValid: boolean = await cryptService.compareHash(password, hash);
    expect(isValid).toBe(true);
  });
  it('should be encode a text to base64url and decode a base64url to text', async () => {
    const cryptService = new CryptService();
    const password = 'a1b2c3d4@';
    const encoded: string = await cryptService.encodeBase64Url(password);
    const decoded: string = await cryptService.decodeBase64Url(encoded);
    expect(decoded).toEqual(password);
  });
  it('should be encrypt a text and decrypt an encrypted text', async () => {
    const cryptService = new CryptService();
    const password = 'a1b2c3d4@';
    const encrypted: string = await cryptService.encrypt(password);
    const decrypted: string = await cryptService.decrypt(encrypted);
    expect(decrypted).toEqual(password);
  });
});
