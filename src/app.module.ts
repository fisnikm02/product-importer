import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { FileService } from './file.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';

import * as dotenv from 'dotenv';
dotenv.config();

const mongoDB = process.env.APP_MONGO_DB;

@Module({
  imports: [
    MongooseModule.forRoot(mongoDB),
    ProductModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, FileService, TaskService],
  exports: [FileService]
})
export class AppModule { }
