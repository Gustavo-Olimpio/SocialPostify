import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { mediasRepository } from './medias.repository';

@Module({
  controllers: [MediasController],
  providers: [MediasService,mediasRepository],
})
export class MediasModule {}
