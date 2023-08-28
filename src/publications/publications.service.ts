import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { postsRepository } from 'src/posts/posts.repository';
import { mediasRepository } from 'src/medias/medias.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly repository: PublicationsRepository, private readonly repositoryPost: postsRepository, private readonly repositoryMedia: mediasRepository) { };
  async create(createPublicationDto: CreatePublicationDto) {
    const post = await this.repositoryPost.getPostsById(createPublicationDto.postId)
    const media = await this.repositoryMedia.getMediasById(createPublicationDto.mediaId)
    if (!media || !post) throw new NotFoundException()
    return await this.repository.postPubli(createPublicationDto);
  }

  async findAll(isPublished: string, after: string) {
    let published = undefined
    if(isPublished === 'true' || isPublished=== 'false'){
      published = isPublished === 'true'
    }
    const array = await this.repository.getPubli();
    let arrayFilter = []
    if (published !== undefined && after !== undefined) {
      const dateNow = new Date()
      if (published === true) {
        arrayFilter = array.filter((e) => new Date(e.date).getTime() < dateNow.getTime())
      } else {
        arrayFilter = array.filter((e) => new Date(e.date).getTime() > dateNow.getTime())
      }
      return arrayFilter.filter((e) => new Date(e.date).getTime() > new Date(after).getTime())
    } else if (published !== undefined) {
      const dateNow = new Date()
      if (published === true) {
        arrayFilter = array.filter((e) => new Date(e.date).getTime() < dateNow.getTime())
      } else {
        arrayFilter = array.filter((e) => new Date(e.date).getTime() > dateNow.getTime())
      }
      return arrayFilter
    } else if (after !== undefined) {
      return array.filter((e) => new Date(e.date).getTime() > new Date(after).getTime())
    }
    return array
  }

  async findOne(id: number) {
    const publi = await this.repository.getPubliById(id);
    if (!publi) throw new NotFoundException()
    return publi
  }

  async update(id: number, updatePublicationDto: CreatePublicationDto) {
    const publi = await this.repository.getPubliById(id);
    if (!publi) throw new NotFoundException();
    const dataPubli = new Date(publi.date)
    const dataNow = new Date()
    const timeDiff = dataNow.getTime() - dataPubli.getTime();
    console.log(timeDiff)
    if (timeDiff >= 0) throw new ForbiddenException();
    const post = await this.repositoryPost.getPostsById(updatePublicationDto.postId)
    const media = await this.repositoryMedia.getMediasById(updatePublicationDto.mediaId)
    if (!media || !post) throw new NotFoundException()
    return await this.repository.putPubli(id, updatePublicationDto);
  }

  async remove(id: number) {
    const publi = await this.repository.getPubliById(id);
    if (!publi) throw new NotFoundException();
    return await this.repository.deletePubli(id);
  }
}
