import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePublicationDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1,
        description:"id for media"
    })
    mediaId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: 1,
        description:"id for post"
    })
    postId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "2023/09/02",
        description:"date for publication"
    })
    date: Date;
};

