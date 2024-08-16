import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async create(@Body() createPetDto) {
    return await this.petsService.create(createPetDto);
  }

  @Get()
  async findAll(@Query() query) {
    return await this.petsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.petsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePetDto) {
    return await this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.petsService.remove(id);
  }
}
