import { BadRequestException, Body, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';

@Injectable()
export class CreatePostProvider {

    constructor(
        /**
         * Injecting users service
         */

        private readonly usersService: UsersService,
        /**
         * Inject postsRepository
         */
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,

        /**
         * Inject TagService
         */
        private readonly tagsService: TagsService,
    ) { }

    public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
        let author = undefined;
        let tags = undefined;

        try {
            //Find author from db by authorId
            author = await this.usersService.findOneById(user.sub)
        } catch (error) {
            throw new ConflictException(error);
        }

        //create Post
        let post = this.postsRepository.create({
            ...createPostDto,
        })

        try {
            //return the post
            return await this.postsRepository.save(post);
        } catch (error) {
            throw new ConflictException(error, {
                description: 'Make sure posts slug is uniq and not a duplicate'
            })
        }
    }
}
