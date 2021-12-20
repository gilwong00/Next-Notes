import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { GraphQLError } from 'graphql';
import { Request, Response } from 'express';
import { SearchModule } from './search/search.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'dev')
          .default('dev'),
        PORT: Joi.number().default(5000),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        SESSION_SECRET: Joi.string().required()
      })
    }),
    DatabaseModule,
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        dateScalarMode: 'timestamp'
      },
      cors: {
        origin: 'http://localhost:3000',
        credentials: true
      },
      formatError(err: GraphQLError) {
        // create a consistent shape later
        return err;
      },
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res
      })
    }),
    NoteModule,
    UserModule,
    DatabaseModule,
    SearchModule
  ]
})
export class AppModule {}
