import { prisma } from '@/database/prisma';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PetsService {
  private select: Prisma.PetSelect = {
    id: true,
    name: true,
    breed: true,
    age: true,
    owner: true,
  };

  async create(createPetDto) {
    const petExist = await prisma.pet.findFirst({
      where: {
        AND: {
          name: createPetDto.name,
          breed: createPetDto.breed,
          age: createPetDto.age,
        },
      },
    });

    if (petExist) {
      throw new ConflictException({
        message: 'Pet already exists',
        type: 'Conflict',
      });
    }

    const pet = await prisma.pet.create({
      data: {
        ...createPetDto,
        age: Number(createPetDto.age),
      },
      select: this.select,
    });
    return {
      pet,
    };
  }

  async findAll({ page = 1, pageSize = 10 }) {
    const pets = await prisma.pet.findMany({
      select: this.select,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      pets,
    };
  }

  async findOne(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
      select: this.select,
    });

    if (!pet) {
      throw new NotFoundException({
        message: 'Pet not found',
        type: 'NotFound',
      });
    }

    return {
      pet,
    };
  }

  async update(id: string, updatePetDto: Prisma.PetUpdateInput) {
    const petExist = await prisma.pet.findUnique({
      where: { id },
      select: this.select,
    });

    if (!petExist) {
      throw new NotFoundException({
        message: 'Pet not found',
        type: 'NotFound',
      });
    }

    return {
      pet: await prisma.pet.update({
        where: { id },
        data: updatePetDto,
      }),
    };
  }

  async remove(id: string) {
    return `This action removes a #${id} pet`;
  }
}
