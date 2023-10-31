"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
    });
    app.use(cookieParser());
    app.enableVersioning({ defaultVersion: '1', type: common_1.VersioningType.URI });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Sen resto')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map