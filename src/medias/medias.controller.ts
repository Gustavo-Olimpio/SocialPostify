import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('medias')
@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  @ApiResponse({
    status:HttpStatus.CREATED,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.CONFLICT,
    description:"title and username already exists"
  })
  @ApiResponse({
    status:HttpStatus.BAD_REQUEST,
    description:"body contains some wrong information"
  })
  @ApiOperation({summary:"media registration",description:"this request serves to get the media and store it in the database"})
  async create(@Body() createMediaDto: CreateMediaDto) {
    return await this.mediasService.create(createMediaDto);
  }

  @Get()
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiOperation({summary:"search of all registration",description:"this request fetches all the medias and shows them"})
  findAll() {
    return this.mediasService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:"If there is no matching record"
  })
  @ApiOperation({summary:"search for a media by ID",description:"this request searches for a specific media by ID"})
  findOne(@Param('id') id: string) {
    return this.mediasService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.CONFLICT,
    description:"title and username already exists"
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:"If there is no matching record"
  })
  @ApiOperation({summary:"put media by id",description:"this request changes the value of media to the value sent"})
  update(@Param('id') id: string, @Body() updateMediaDto: CreateMediaDto) {
    return this.mediasService.update(+id, updateMediaDto);
  }

  @Delete(':id')
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:"If there is no matching record"
  })
  @ApiOperation({summary:"Delete media by ID",description:"this request deletes a specific media by id"})
  remove(@Param('id') id: string) {
    return this.mediasService.remove(+id);
  }
}
