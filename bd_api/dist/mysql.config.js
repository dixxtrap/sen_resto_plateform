"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("./typeorm");
const config = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    dateStrings: true,
    entities: typeorm_1.entities,
    database: 'sen-resto-test',
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=mysql.config.js.map