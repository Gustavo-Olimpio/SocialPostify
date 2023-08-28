import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { createMedia, initializeFactoryPrisma,createPosts, createPubli } from './factories';


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
    initializeFactoryPrisma(prisma);
  });
  describe('/health ', () => {
  it('get/health', async () => {
    return await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('I’m okay!');
  });
});
describe('/medias ', () => {
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
    const media = await createMedia();
    return await request(app.getHttpServer())
    .get(`/medias/${media.id}`)
    .expect(HttpStatus.OK)
    .expect(media);
  })
  it('put/medias/id', async () => {
    const media = await createMedia();
    return await request(app.getHttpServer())
    .put(`/medias/${media.id}`)
    .send({
      title:"Gustavo",
      username:"GmK"
    })
    .expect(HttpStatus.OK)
  })
  it('delete/medias/id', async () => {
    const media = await createMedia();
    return await request(app.getHttpServer())
    .delete(`/medias/${media.id}`)
    .expect(HttpStatus.OK)
  })
});
describe('/posts ', () => {
  it('post/posts', async () => {
    return await request(app.getHttpServer())
    .post('/posts')
    .send({
      title:"oi",
      text:"oi"
    })
    .expect(HttpStatus.CREATED);
  })
  it('get/posts', async () => {
    const posts = await prisma.posts.findMany();
    return await request(app.getHttpServer())
    .get('/posts')
    .expect(HttpStatus.OK)
    .expect(posts);
  })
  it('get/posts/id', async () => {
    const post = await createPosts()
    return await request(app.getHttpServer())
    .get(`/posts/${post.id}`)
    .expect(HttpStatus.OK)
    .expect(post);
  })
  it('put/posts/id', async () => {
    const post = await createPosts()
    return await request(app.getHttpServer())
    .put(`/posts/${post.id}`)
    .send({
      title:"Gustavo",
      text:"GmK"
    })
    .expect(HttpStatus.OK)
  })
  it('delete/posts/id', async () => {
    const post = await createPosts()
    return await request(app.getHttpServer())
    .delete(`/posts/${post.id}`)
    .expect(HttpStatus.OK)
  })
});
describe('/publications ', () => {
  it('post/publications', async () => {
    const media = await createMedia()
    const post = await createPosts()
    return await request(app.getHttpServer())
    .post('/publications')
    .send({
      mediaId:media.id,
      postId:post.id,
      date:"2023-08-21T13:25:17.352Z"
    })
    .expect(HttpStatus.CREATED);
  })
  it('get/publications', async () => {
    const publi = await prisma.publications.findMany();
    return await request(app.getHttpServer())
    .get('/publications')
    .expect(HttpStatus.OK)
    .expect(publi);
  })
  it('get/publications/id', async () => {
    const media = await createMedia()
    const post = await createPosts()
    const publi = await createPubli(media.id,post.id)
    return await request(app.getHttpServer())
    .get(`/publications/${publi.id}`)
    .expect(HttpStatus.OK)
    .expect({
      id:publi.id,
      mediaId:publi.mediaId,
      postId:publi.postId,
      date:publi.date.toISOString()
    });
  })
  it('put/publications/id', async () => {
    const media = await createMedia()
    const post = await createPosts()
    const publi = await createPubli(media.id,post.id)
    return await request(app.getHttpServer())
    .put(`/publications/${publi.id}`)
    .send({
      mediaId:media.id,
      postId:post.id,
      date:"2025-08-21T13:25:17.352Z"
    })
    .expect(HttpStatus.OK)
  })
  it('delete/posts/id', async () => {
    const media = await createMedia()
    const post = await createPosts()
    const publi = await createPubli(media.id,post.id)
    return await request(app.getHttpServer())
    .delete(`/publications/${publi.id}`)
    .expect(HttpStatus.OK)
  })
});
});
