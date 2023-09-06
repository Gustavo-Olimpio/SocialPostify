import { PrismaService } from 'src/prisma/prisma.service';
import { faker } from '@faker-js/faker';

let prisma: PrismaService;

export function initializeFactoryPrisma(prismaService: PrismaService) {
  prisma = prismaService;
}

export function createMedia() {
    return prisma.medias.create({
    data: {
      title: faker.person.jobTitle(),
      username: faker.internet.userName(),
    },
  });
}
export function createPosts(){
    return prisma.posts.create({
        data:{
            title:faker.company.name(),
            text:faker.lorem.paragraph(),
            image:faker.internet.url()
        }
    })
}
export function createPubli(mediaId:number,postId:number,IsPublished:boolean){
    return prisma.publications.create({
        data: {
            mediaId,
            postId,
            date:(IsPublished ? "2022-09-21T13:25:17.352Z" : "2025-08-21T13:25:17.352Z")
        }
    })
}