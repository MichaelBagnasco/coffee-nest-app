import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      username: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log(process.env.DATABASE_USER);
