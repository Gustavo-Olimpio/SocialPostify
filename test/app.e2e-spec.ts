import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';



describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule,PrismaModule],
    })
    .compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    prisma = app.get(PrismaService)
    await prisma.publications.deleteMany();
    await prisma.posts.deleteMany();
    await prisma.medias.deleteMany();
    await app.init();

  });

  it('get/health', async () => {
    return await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('I’m okay!');
  });
  it('post/medias', async () => {
    return await request(app.getHttpServer())
    .post('/medias')
    .send({
      title:"oi",
      username:"oi"
    })
    .expect(HttpStatus.CREATED);
  })
  it('get/medias', async () => {
    const medias = await prisma.medias.findMany();
    return await request(app.getHttpServer())
    .get('/medias')
    .expect(HttpStatus.OK)
    .expect(medias);
  })
  it('get/medias/id', async () => {
    const media = await prisma.medias.create({
      data:{
        title:"oi",
        username:"oi"
      }
    });
    return await request(app.getHttpServer())
    .get(`/medias/${media.id}`)
    .expect(HttpStatus.OK)
    .expect(media);
  })
  it('put/medias/id', async () => {
    const media = await prisma.medias.create({
      data:{
        title:"oi",
        username:"oi"
      }
    });
    return await request(app.getHttpServer())
    .put(`/medias/${media.id}`)
    .send({
      title:"Gustavo",
      username:"GmK"
    })
    .expect(HttpStatus.OK)
  })
  it('delete/medias/id', async () => {
    const media = await prisma.medias.create({
      data:{
        title:"oi",
        username:"oi"
      }
    });
    return await request(app.getHttpServer())
    .delete(`/medias/${media.id}`)
    .expect(HttpStatus.OK)
  })

});
