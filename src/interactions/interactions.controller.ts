import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { Prisma } from '@prisma/client';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  createInteraction(
    @Body() createInteractionDto: Prisma.InteractionCreateInput,
  ) {
    return this.interactionsService.createInteraction(createInteractionDto);
  }

  @Get('user/:userId')
  getInteractionsForUser(@Param('userId') userId: string) {
    return this.interactionsService.getInteractionsForUser(userId);
  }

  @Get(':id')
  getInteractionById(@Param('id') id: string) {
    return this.interactionsService.getInteractionById(id);
  }
}
