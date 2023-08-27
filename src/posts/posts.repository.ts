import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class postsRepository {
    constructor(private readonly prisma: PrismaService){};
    postPosts(body : CreatePostDto){
        return this.prisma.posts.create({
            data:body
         })
    }
    getPosts(){
        return this.prisma.posts.findMany()
    }
    getPostsById(id:number){
        return this.prisma.posts.findFirst({
            where : {
                id
            }
        })
    }
    putPosts(id:number,body : CreatePostDto){
        return this.prisma.posts.update({
            where : {
                id
            }, data : body
        })
    }
    deletePost(id:number){
        return this.prisma.posts.delete({
            where :{
                id
            }
        })
    }
    findPublicationPost(id:number){
        return this.prisma.publications.findFirst({
            where:{
                postId:id
            }
        })
    }
};