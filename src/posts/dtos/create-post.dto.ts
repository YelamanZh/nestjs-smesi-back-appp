import { IsEnum, IsNotEmpty, IsString, Matches, MinLength, IsOptional, IsJSON, IsUrl, IsDate, IsArray, ValidateNested, MaxLength, IsInt } from "class-validator";
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum";
import { CreatePostMetaOptionsDto } from "../../meta-options/dtos/create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        description: "This is the title"
    })
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    @MaxLength(512)
    title: string;

    @ApiProperty({
        enum: postType,
        description: "Possible values: post, page. story, series"
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType;

    @ApiProperty({
        description: "For example - 'my url",
        example: "my blog post"
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
    })
    slug: string;

    @ApiProperty({
        enum: postStatus,
        description: "Possible values: draft, scheduled. review, published"
    })
    @IsEnum(postStatus)
    @IsNotEmpty()
    status: postStatus;

    @ApiPropertyOptional({
        description: "This is the content of the post",
        example: "The post content"
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description: "Serialize your JSON object else a validation error will be thrown",
        example: '{\r\n "@context": "https://schema.org",\r\n "@type": "Person"\r\n }'
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'Featured images for your blog post',
        example: 'http://localhost.com/images/image1.jpg',
    })
    @IsOptional()
    @IsArray()
    @IsUrl({}, { each: true })
    featuredImageUrls?: string[];

    @ApiPropertyOptional({
        description: 'The date on which the blog post is published',
        example: '2024-03-16T07:46:32+0000',
    })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    publishOn?: Date;

    @ApiPropertyOptional({
        type: 'object',
        required: false,
        items: {
            type: 'object',
            properties: {
                metaValue: {
                    type: 'json',
                    description: 'The metaValue is a JSON string',
                    example: '{"sidebarEnabled": true}',
                },
            },
        },
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto | null;

    @ApiPropertyOptional({
        description: 'Array of ids of tags',
        example: [1, 2],
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    tags?: number[];
}