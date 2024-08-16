import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { PetsService } from './pets/pets.service';
import { PetsModule } from './pets/pets.module';
import { MatchesModule } from './matches/matches.module';
import { InteractionsModule } from './interactions/interactions.module';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    PetsModule,
    MatchesModule,
    InteractionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PetsService],
})
export class AppModule {}
