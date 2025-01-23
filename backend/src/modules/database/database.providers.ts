import { ConfigModule, ConfigService } from '@nestjs/config';
import { entities } from 'src/typeorm';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    import: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: entities,
        synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
      });
      return dataSource.initialize();
    },
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize();
      return dataSource;
    },
  },
];
