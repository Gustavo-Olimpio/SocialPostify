import { Controller, Get, Post, Body, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiResponse({
    status:HttpStatus.CREATED,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.BAD_REQUEST,
    description:"body contains some wrong information"
  })
  @ApiOperation({summary:"post registration",description:"this request serves to get the post and store it in the database"})
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiOperation({summary:"search of all registration",description:"this request fetches all the posts and shows them"})
  findAll() {
    return this.postsService.findAll();
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
  @ApiOperation({summary:"search for a post by ID",description:"this request searches for a specific post by ID"})
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:"If there is no matching record"
  })
  @ApiOperation({summary:"put post by id",description:"this request changes the value of post to the value sent"})
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.FORBIDDEN,
    description:"The post can only be deleted if it is not part of any publication"
  })
  @ApiResponse({
    status:HttpStatus.NOT_FOUND,
    description:"If there is no matching record"
  })
  @ApiOperation({summary:"Delete post by ID",description:"this request deletes a specific post by id"})
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
