import * as CryptoJS from 'crypto-js';
export class CryptoService {
  private static readonly algorithm = 'aes-256-ctr';
  // should be kept secret

  static async encrypt(text: string): Promise<string> {
    console.log('encrytp');
    return CryptoJS.AES.encrypt(text, process.env.CRYPTO_KEY).toString();
  }

  static decrypt(text: string): string {
    const bytes = CryptoJS.AES.decrypt(text, process.env.CRYPTO_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
  static createHash(data: string): string {
    const hash = CryptoJS.SHA256(data);
    // Convert the hash to a hexadecimal string
    const hashString = hash.toString(CryptoJS.enc.Hex);
    return hashString;
  }

  // Generate String representation
  // static generateRandomString(length) {
  //   const randomBytes = CryptoJS.(length);
  //   const randomString = randomBytes.toString('hex');
  //   const randomIndex = Math.floor(Math.random() * length);
  //   const capitalizedString =
  //     randomString.substring(0, randomIndex) +
  //     randomString.charAt(randomIndex).toUpperCase() +
  //     randomString.substring(randomIndex + 1);
  //   return capitalizedString;
  // }
}
