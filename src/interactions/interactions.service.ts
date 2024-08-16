import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';

@Injectable()
export class InteractionsService {
  async createInteraction(createInteractionDto: Prisma.InteractionCreateInput) {
    return await prisma.interaction.create({
      data: createInteractionDto,
    });
  }

  async getInteractionsForUser(userId: string) {
    return await prisma.interaction.findMany({
      where: { userId },
      include: { pet: true },
    });
  }

  async getInteractionById(id: string) {
    const interaction = await prisma.interaction.findUnique({
      where: { id },
      include: { pet: true },
    });

    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }

    return interaction;
  }
}
