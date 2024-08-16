import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchService: MatchesService) {}

  @Post()
  createMatch(@Body() createMatchDto: Prisma.MatchCreateInput) {
    return this.matchService.createMatch(createMatchDto);
  }

  @Get('user/:userId')
  getMatchesForUser(@Param('userId') userId: string) {
    return this.matchService.getMatchesForUser(userId);
  }

  @Get(':id')
  getMatchById(@Param('id') id: string) {
    return this.matchService.getMatchById(id);
  }
}
