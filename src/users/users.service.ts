import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { prisma } from '@/database/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}
  async getCep(cep: string) {
    const response = await this.httpService.axiosRef.get(
      `https://viacep.com.br/ws/${cep}/json/`,
    );

    return response.data;
  }

  async create(createUserDto: Prisma.UserCreateInput) {
    const userExists = await prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new BadRequestException({
        message: 'User already exists',
        type: 'UserAlreadyExists',
      });
    }

    try {
      return await prisma.user.create({
        data: {
          ...createUserDto,
          birthdate: new Date(createUserDto.birthdate),
          preference: {
            create: createUserDto.preference,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
        type: 'CreateUserError',
      });
    }
  }

  async findAll() {
    try {
      return {
        users: await prisma.user.findMany({
          include: {
            pet: true,
            match: true,
          },
        }),
      };
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
        type: 'FindAllUsersError',
      });
    }
  }

  async findOne(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        pet: true,
        match: true,
      },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
        type: 'NotFound',
      });
    }

    return {
      user,
    };
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new NotFoundException({
        message: 'User not found',
        type: 'NotFound',
      });
    }

    return await prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        preference: {
          upsert: {
            create: updateUserDto.preference,
            update: updateUserDto.preference,
          },
        },
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
