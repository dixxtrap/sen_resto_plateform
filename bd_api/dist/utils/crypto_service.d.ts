export declare class CryptoService {
    private static readonly algorithm;
    static encrypt(text: string): string;
    static decrypt(text: string): string;
    static createHash(data: string): string;
    static generateRandomString(length: any): string;
}
