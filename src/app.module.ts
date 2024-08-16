import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { PetsService } from './pets/pets.service';
import { PetsController } from './pets/pets.controller';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [UsersModule, HttpModule, PetsModule],
  controllers: [AppController, PetsController],
  providers: [AppService, PetsService],
})
export class AppModule {}
