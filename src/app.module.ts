import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [UsersModule, HttpModule, PetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
