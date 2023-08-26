import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";

@Injectable()
export class mediasRepository {
    constructor(private readonly prisma: PrismaService){};
    postMedias(body : CreateMediaDto){
        return this.prisma.medias.create({
            data:body
         })
    }
    validaMedias(body : CreateMediaDto){
       return this.prisma.medias.findFirst({
           where: {
            username: body.username,
            title:body.title
           }
        })
   }
    getMedias(){
    return this.prisma.medias.findMany()
    }
    getMediasById(id:number){
        return this.prisma.medias.findFirst(
            {
                where:{
                    id
                }
            }
        )
    }
    putMedias(id:number,body:UpdateMediaDto){
        return this.prisma.medias.update({
            where : {
                id
            } , 
            data:body
        })
    }
    deleteMedias(id:number){
        return this.prisma.medias.delete({
            where : {
                id
            }
        })
    }
    

};