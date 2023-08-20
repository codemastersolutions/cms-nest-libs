import { Injectable } from '@nestjs/common';
import { scrypt, Cipher, createCipheriv, createDecipheriv } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import base64url from 'base64url';

@Injectable()
export class CryptService {
  private encryptKey: string;
  private iv: string;

  constructor() {
    const appKey = process.env.NEST_APP_KEY;
    if (appKey) {
      const [iv, key] = appKey.split('@@');
      this.encryptKey = key;
      this.iv = iv;
    }
  }

  async compareHash(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }

  async encrypt(text: string): Promise<string> {
    const key: Buffer = (await promisify(scrypt)(
      this.encryptKey,
      'salt',
      32,
    )) as Buffer;
    const cipher: Cipher = createCipheriv('aes-256-ctr', key, this.iv);
    const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);
    return encryptedText.toString('base64url');
  }

  async decrypt(encryptedText: string): Promise<string> {
    const key = (await promisify(scrypt)(
      this.encryptKey,
      'salt',
      32,
    )) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText, 'base64url'),
      decipher.final(),
    ]);
    return decryptedText.toString();
  }

  async hash(text: string, saltOrRounds = 10): Promise<string> {
    return await bcrypt.hash(text, saltOrRounds);
  }

  async encodeBase64Url(text: string, encoding = 'utf8'): Promise<string> {
    return new Promise(async resolve => {
      const encoded = base64url.encode(text, encoding);
      resolve(encoded);
    });
  }

  async decodeBase64Url(
    base64UrlText: string,
    encoding = 'utf8',
  ): Promise<string> {
    return new Promise(async resolve => {
      const decoded = base64url.decode(base64UrlText, encoding);
      resolve(decoded);
    });
  }
}
