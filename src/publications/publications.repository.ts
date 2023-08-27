import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";

@Injectable()
export class PublicationsRepository {
    constructor(private readonly prisma: PrismaService){};
    postPubli(body : CreatePublicationDto){
        return this.prisma.publications.create({
            data:body
         })
    }
    getPubli(){
        return this.prisma.publications.findMany();
    }
    getPubliById(id:number){
        return this.prisma.publications.findFirst({
            where:{
                id
            }
        });
    }
    putPubli(id:number,body : CreatePublicationDto){
        return this.prisma.publications.update({
            where:{
                id
            }, data:body
        });
    }
    deletePubli(id:number){
        return this.prisma.publications.delete({
            where : {
                id
            }
        })
    }
};