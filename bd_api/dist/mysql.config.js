"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("./typeorm");
const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    dateStrings: true,
    entities: typeorm_1.entities,
    database: 'sen_resto',
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=mysql.config.js.map