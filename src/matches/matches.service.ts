import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from '@/database/prisma';

@Injectable()
export class MatchesService {
  async createMatch(createMatchDto: Prisma.MatchCreateInput) {
    return await prisma.match.create({
      data: createMatchDto,
    });
  }

  async getMatchesForUser(userId: string) {
    return await prisma.match.findMany({
      where: { userId },
      include: { pet: true },
    });
  }

  async getMatchById(id: string) {
    const match = await prisma.match.findUnique({
      where: { id },
      include: { pet: true },
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    return match;
  }
}
