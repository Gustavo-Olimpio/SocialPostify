import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsRepository } from './posts.repository';

@Module({
  controllers: [PostsController],
  providers: [PostsService,postsRepository],
})
export class PostsModule {}
