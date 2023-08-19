"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let CryptoService = class CryptoService {
    static encrypt(text) {
        console.log('encrytp');
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, process.env.CRYPTO_KEY, iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    static decrypt(text) {
        console.log('decrytp');
        const parts = text.split(':');
        const iv = Buffer.from(parts.shift(), 'hex');
        const encryptedText = Buffer.from(parts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, process.env.CYPHER_KEY, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    static createHash(data) {
        const hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
    }
    static generateRandomString(length) {
        const randomBytes = crypto.randomBytes(length);
        const randomString = randomBytes.toString('hex');
        const randomIndex = Math.floor(Math.random() * length);
        const capitalizedString = randomString.substring(0, randomIndex) +
            randomString.charAt(randomIndex).toUpperCase() +
            randomString.substring(randomIndex + 1);
        return capitalizedString;
    }
};
CryptoService.algorithm = 'aes-256-ctr';
CryptoService = __decorate([
    (0, common_1.Injectable)()
], CryptoService);
exports.CryptoService = CryptoService;
//# sourceMappingURL=crypto_service.js.map