import { PrismaService } from 'src/prisma/prisma.service';

let prisma: PrismaService;

export function initializeFactoryPrisma(prismaService: PrismaService) {
  prisma = prismaService;
}

export function createMedia() {
    return prisma.medias.create({
    data: {
      title: 'oi',
      username: 'oi',
    },
  });
}
export function createPosts(){
    return prisma.posts.create({
        data:{
            title:'oii',
            text:'oii',
            image:'google.com'
        }
    })
}
export function createPubli(mediaId:number,postId:number){
    return prisma.publications.create({
        data: {
            mediaId,
            postId,
            date:"2024-09-21T13:25:17.352Z"
        }
    })
}