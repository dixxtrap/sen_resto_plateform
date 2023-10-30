import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private static readonly algorithm = 'aes-256-ctr';
  // should be kept secret

  static encrypt(text: string): string {
    console.log('encrytp');
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
      this.algorithm,
      process.env.CRYPTO_KEY,
      iv,
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  static decrypt(text: string): string {
    console.log('decrytp');
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      process.env.CYPHER_KEY,
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
  static createHash(data: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  }

  // Generate String representation
  static generateRandomString(length) {
    const randomBytes = crypto.randomBytes(length);
    const randomString = randomBytes.toString('hex');
    const randomIndex = Math.floor(Math.random() * length);
    const capitalizedString =
      randomString.substring(0, randomIndex) +
      randomString.charAt(randomIndex).toUpperCase() +
      randomString.substring(randomIndex + 1);
    return capitalizedString;
  }
}
