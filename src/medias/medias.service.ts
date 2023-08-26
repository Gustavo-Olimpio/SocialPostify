import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { mediasRepository } from './medias.repository';
import { NotFoundError } from 'rxjs';

@Injectable()
export class MediasService {
  constructor(private readonly repository: mediasRepository){};
  async create(createMediaDto: CreateMediaDto) {
    const valida = await this.repository.validaMedias(createMediaDto);
    if(valida) throw new ConflictException(); 
    return await this.repository.postMedias(createMediaDto);
  }

  async findAll() {
    return await this.repository.getMedias();
  }

  async findOne(id: number) {
    const media = await this.repository.getMediasById(id);
    if(!media) throw new NotFoundException();
    return media
  }

  async update(id: number, body: CreateMediaDto) {
    const media = await this.repository.getMediasById(id);
    if(!media) throw new NotFoundException();
    const valida = await this.repository.validaMedias(body);
    if(valida) throw new ConflictException(); 
    return await this.repository.putMedias(id,body);
  }

  async remove(id: number) {
    //A media só pode ser deletada se não estiver fazendo parte de nenhuma publicação (agendada ou publicada). Neste caso, retornar o status code 403 Forbidden.
    const media = await this.repository.getMediasById(id);
    if(!media) throw new NotFoundException();
    return await this.repository.deleteMedias(id);
  }
}
