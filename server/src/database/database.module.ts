import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Note } from 'src/note/models/note.model';
import { User } from 'src/user/models/user.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [Note, User],
        logger: 'advanced-console',
        logging: process.env.NODE_ENV !== 'production',
        synchronize: process.env.NODE_ENV !== 'production'
      })
    })
  ]
})
export class DatabaseModule {}
