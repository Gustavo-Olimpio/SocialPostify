import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl} from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    @ApiProperty({
        example: "Why dogs are insane?",
        description:"title of the post"
    })
    title: string;

    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    @ApiProperty({
        example: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.",
        description:"text of the post"
    })
    text: string;

    @IsString()
    @IsUrl()
    @IsOptional()
    @ApiProperty({
        example: "https://www.shutterstock.com/pt/image-generated/metallic-3d-image-abstract-futuristic-cyberpunk-2288785777",
        description:"optional url image of the post"
    })
    image: string | null;
};

