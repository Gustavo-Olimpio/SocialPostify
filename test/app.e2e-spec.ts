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
  describe('/HEALTH ', () => {
  it('200 when everything is correct', async () => {
    return await request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('I’m okay!');
  });
});
describe('/MEDIAS ', () => {
  describe('POST ', () => {
    it('400 when body is invalid', async () => {
      return await request(app.getHttpServer())
      .post('/medias')
      .send({
        title:"title"
      })
      .expect(HttpStatus.BAD_REQUEST);
    }) 
    it('409 when title and username already exist', async () => {
      const media = await createMedia();
      return await request(app.getHttpServer())
      .post('/medias')
      .send({
        title:media.title,
        username:media.username
      })
      .expect(HttpStatus.CONFLICT);
    }) 
  it('200 when everything is correct', async () => {
    return await request(app.getHttpServer())
    .post('/medias')
    .send({
      title:"titulo",
      username:"username"
    })
    .expect(HttpStatus.CREATED);
  })

})
describe('GET ALL ', () => {
  it('200 when everything is correct', async () => {
    const media = createMedia();
    const medias = await prisma.medias.findMany();
    return await request(app.getHttpServer())
    .get('/medias')
    .expect(HttpStatus.OK)
    .expect(medias);
  })
  it('200 when everything is correct and medias is empty', async () => {
    const medias = await prisma.medias.findMany();
    return await request(app.getHttpServer())
    .get('/medias')
    .expect(HttpStatus.OK)
    .expect(medias)
    .expect([]);
  })
})
describe('GET BY ID ', () => {
  it('404 when value not found', async () => {
    return await request(app.getHttpServer())
    .get(`/medias/1`)
    .expect(HttpStatus.NOT_FOUND)
  })
  it('200 when everything is correct', async () => {
    const media = await createMedia();
    return await request(app.getHttpServer())
    .get(`/medias/${media.id}`)
    .expect(HttpStatus.OK)
    .expect(media);
  })
})
describe('PUT', () => {
  it('404 when value not found', async () => {
    return await request(app.getHttpServer())
    .put(`/medias/1`)
    .send({
      title:"title",
      username:"username"
    })
    .expect(HttpStatus.NOT_FOUND)
  })
  it('409 when title and username already exist', async () => {
    const media = await createMedia();
    const media2 = await createMedia();
    return await request(app.getHttpServer())
    .put(`/medias/${media.id}`)
    .send({
      title:media2.title,
      username:media2.username
    })
    .expect(HttpStatus.CONFLICT)
  })
  it('200 when everything is correct', async () => {
    const media = await createMedia();
    return await request(app.getHttpServer())
    .put(`/medias/${media.id}`)
    .send({
      title:"titlee",
      username:"usernamee"
    })
    .expect(HttpStatus.OK)
  })
})
describe('DELETE', () => {
  it('404 when value not found', async () => {
    return await request(app.getHttpServer())
    .delete(`/medias/1`)
    .expect(HttpStatus.NOT_FOUND)
  })
  it('403 when value is part of a publication', async () => {
    const media = await createMedia();
    const post = await createPosts();
    const publi = await createPubli(media.id,post.id,false)
    return await request(app.getHttpServer())
    .delete(`/medias/${media.id}`)
    .expect(HttpStatus.FORBIDDEN)
  })
  it('200 when everything is correct', async () => {
    const media = await createMedia();
    return await request(app.getHttpServer())
    .delete(`/medias/${media.id}`)
    .expect(HttpStatus.OK)
  })
})
});
describe('/POSTS ', () => {
  describe('POST', () => {
    it('400 when body is invalid', async () => {
      return await request(app.getHttpServer())
      .post('/posts')
      .send({
        title:"title"
      })
      .expect(HttpStatus.BAD_REQUEST);
    })
  it('200 when everything is correct', async () => {
    return await request(app.getHttpServer())
    .post('/posts')
    .send({
      title:"title",
      text:"text"
    })
    .expect(HttpStatus.CREATED);
  })
})
describe('GET ALL', () => {
  it('200 when everything is correct', async () => {
    const post = await createPosts()
    return await request(app.getHttpServer())
    .get('/posts')
    .expect(HttpStatus.OK)
    .expect([post]);
  })
  it('200 when everything is correct and posts is empty', async () => {
    const posts = await prisma.posts.findMany();
    return await request(app.getHttpServer())
    .get('/posts')
    .expect(HttpStatus.OK)
    .expect([]);
  })
})
describe('GET BY ID', () => {
  it('404 when value not found', async () => {
    return await request(app.getHttpServer())
    .get(`/posts/1`)
    .expect(HttpStatus.NOT_FOUND)
  })
  it('200 when everything is correct', async () => {
    const post = await createPosts()
    return await request(app.getHttpServer())
    .get(`/posts/${post.id}`)
    .expect(HttpStatus.OK)
    .expect(post);
  })
})
describe('PUT', () => {
  it('404 when value not found', async () => {
    return await request(app.getHttpServer())
    .put(`/posts/1`)
    .send({
      title:"title",
      text:"text"
    })
    .expect(HttpStatus.NOT_FOUND)
  })
  it('200 when everything is correct', async () => {
    const post = await createPosts()
    return await request(app.getHttpServer())
    .put(`/posts/${post.id}`)
    .send({
      title:"title",
      text:"text"
    })
    .expect(HttpStatus.OK)
  })
})
describe('DELETE', () => {
  it('404 when value not found', async () => {
    return await request(app.getHttpServer())
    .delete(`/posts/1`)
    .expect(HttpStatus.NOT_FOUND)
  })
  it('403 when value is part of a publication', async () => {
    const media = await createMedia();
    const post = await createPosts();
    const publi = await createPubli(media.id,post.id,false)
    return await request(app.getHttpServer())
    .delete(`/posts/${post.id}`)
    .expect(HttpStatus.FORBIDDEN)
  })
  it('200 when everything is correct', async () => {
    const post = await createPosts()
    return await request(app.getHttpServer())
    .delete(`/posts/${post.id}`)
    .expect(HttpStatus.OK)
  })
})
});
describe('/PUBLICATIONS ', () => {
  describe('POST', () => {
    it('400 when body is invalid', async () => {
      const media = await createMedia()
      return await request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId:media.id
      })
      .expect(HttpStatus.BAD_REQUEST);
    })
    it('404 when mediaId or postId do not exist', async () => {
      return await request(app.getHttpServer())
      .post('/publications')
      .send({
        mediaId:1,
        postId:1,
        date:"2023-08-21T13:25:17.352Z"
      })
      .expect(HttpStatus.NOT_FOUND);
    })
  it('200 when everything is correct', async () => {
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
})
describe('GET ALL', () => {
  it('200 when everything is correct', async () => {
    const media = await createMedia()
    const post = await createPosts()
    const publi = await createPubli(media.id,post.id,false)
    return await request(app.getHttpServer())
    .get('/publications')
    .expect(HttpStatus.OK)
    .expect([{
      id:publi.id,
      mediaId:publi.mediaId,
      postId:publi.postId,
      date:publi.date.toISOString()
    }])
  })
  it('200 when everything is correct and publications is empty', async () => {
    return await request(app.getHttpServer())
    .get('/publications')
    .expect(HttpStatus.OK)
    .expect([]);
  })
})
describe('GET BY ID', () => {
  it('404 when value not found', async () => {
    return await request(app.getHttpServer())
    .get(`/publications/1`)
    .expect(HttpStatus.NOT_FOUND)
  })
  it('200 when everything is correct', async () => {
    const media = await createMedia()
    const post = await createPosts()
    const publi = await createPubli(media.id,post.id,false)
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
})
describe('PUT', () => {
  it('404 when value not found', async () => {
    const media = await createMedia()
    const post = await createPosts()
    return await request(app.getHttpServer())
    .put(`/publications/1`)
    .send({
      mediaId:media.id,
      postId:post.id,
      date:"2025-08-21T13:25:17.352Z"
    })
    .expect(HttpStatus.NOT_FOUND)
  })
  it('404 mediaId or postId do not exist', async () => {
    const media = await createMedia()
    const post = await createPosts()
    const publi = await createPubli(media.id,post.id,true)
    return await request(app.getHttpServer())
    .put(`/publications/1`)
    .send({
      mediaId:1,
      postId:1,
      date:"2025-08-21T13:25:17.352Z"
    })
    .expect(HttpStatus.NOT_FOUND)
  })
  it('403 when publication has already been published', async () => {
    const media = await createMedia()
    const post = await createPosts()
    const publi = await createPubli(media.id,post.id,true)
    return await request(app.getHttpServer())
    .put(`/publications/${publi.id}`)
    .send({
      mediaId:media.id,
      postId:post.id,
      date:"2025-08-21T13:25:17.352Z"
    })
    .expect(HttpStatus.FORBIDDEN)
  })
  it('200 when everything is correct', async () => {
    const media = await createMedia()
    const post = await createPosts()
    const publi = await createPubli(media.id,post.id,false)
    return await request(app.getHttpServer())
    .put(`/publications/${publi.id}`)
    .send({
      mediaId:media.id,
      postId:post.id,
      date:"2025-08-21T13:25:17.352Z"
    })
    .expect(HttpStatus.OK)
  })
})
describe('DELETE', () => {
  it('404 when value not found', async () => {
    return await request(app.getHttpServer())
    .delete(`/publications/1`)
    .expect(HttpStatus.NOT_FOUND)
  })
  it('200 when everything is correct', async () => {
    const media = await createMedia()
    const post = await createPosts()
    const publi = await createPubli(media.id,post.id,false)
    return await request(app.getHttpServer())
    .delete(`/publications/${publi.id}`)
    .expect(HttpStatus.OK)
  })
})
});
});
