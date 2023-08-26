import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { postsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly repository: postsRepository){};
  async create(createPostDto: CreatePostDto) {
    return await this.repository.postPosts(createPostDto);
  }

  async findAll() {
    const posts = await this.repository.getPosts();
    const newArray = posts.map((post) => ({
      id: post.id,
      title: post.title,
      text: post.text,
      ...(post.image && { image: post.image }),
    }));
      return newArray
    }
  

  async findOne(id: number) {
    const post = await this.repository.getPostsById(id);
    if(!post) throw new NotFoundException()
    if(!post.image){
      delete post.image
    }
    return post
  }

  async update(id: number, updatePostDto: CreatePostDto) {
    const post = await this.repository.getPostsById(id);
    if(!post) throw new NotFoundException()
    return await this.repository.putPosts(id,updatePostDto);
  }

  async remove(id: number) {
    //O post só pode ser deletado se não estiver fazendo parte de nenhuma publicação (agendada ou publicada). Neste caso, retornar o status code 403 Forbidden.
    const post = await this.repository.getPostsById(id);
    if(!post) throw new NotFoundException()
    return await this.repository.deletePost(id);
  }
}
