import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediasService.create(createMediaDto);
  }

  @Get()
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: CreateMediaDto) {
    return this.mediasService.update(+id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediasService.remove(+id);
  }
}