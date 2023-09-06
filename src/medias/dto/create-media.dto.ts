import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDto {
    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    @ApiProperty({
        example: "facebook",
        description:"media name"
    })
    title: string;

    @IsString()
    @IsNotEmpty({
        message: "All fields are required!"
    })
    @ApiProperty({
        example: "User01",
        description:"name used in social media"
    })
    username: string;
};
