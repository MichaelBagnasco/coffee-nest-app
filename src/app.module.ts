import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    CoffeesModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        useCreateIndex: true,
        uri: `${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
        dbName: process.env.DATABASE_NAME,
        auth: {
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
