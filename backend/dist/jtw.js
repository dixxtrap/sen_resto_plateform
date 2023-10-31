"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jwt_1 = require("@nestjs/jwt");
exports.JWT = jwt_1.JwtModule.register({
    secret: process.env.API_KEY,
    signOptions: {
        expiresIn: '2d',
    },
});
//# sourceMappingURL=jtw.js.map