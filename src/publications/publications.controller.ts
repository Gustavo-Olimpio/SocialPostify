import { Controller, Get, Post, Body,Param, Delete, Put, Query, HttpStatus } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:"there are no records matching the mediaId and postId"
  })
  @ApiResponse({
    status:HttpStatus.BAD_REQUEST,
    description:"body contains some wrong information"
  })
  @ApiOperation({summary:"publication registration",description:"this request serves to get the publication and store it in the database"})
  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.create(createPublicationDto);
  }
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiOperation({summary:"search of all registration",description:"this request fetches all the publications and shows them"})
  @Get()
  findAll(@Query('published')  published : string , @Query('after') after:string) {
    return this.publicationsService.findAll(published,after);
  }
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:"If there is no matching record"
  })
  @ApiOperation({summary:"search for a publication by ID",description:"this request searches for a specific publication by ID"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationsService.findOne(+id);
  }
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.FORBIDDEN,
    description:"It must not be possible to change the information of a record of a publication that has already been published"
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:"If there is no matching record"
  })
  @ApiOperation({summary:"put publication by id",description:"this request changes the value of publication to the value sent"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: CreatePublicationDto) {
    return this.publicationsService.update(+id, updatePublicationDto);
  }
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:"If there is no matching record"
  })
  @ApiOperation({summary:"Delete publication by ID",description:"this request deletes a specific publication by id"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationsService.remove(+id);
  }
}
