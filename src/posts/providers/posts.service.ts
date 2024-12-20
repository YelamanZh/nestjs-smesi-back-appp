import { BadRequestException, Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';

@Injectable()
export class PostsService {

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
         * Inject MetaOptionsRepository
         */
        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>,

        /**
         * Inject TagService
         */
        private readonly tagsService: TagsService,

        /**
         * Injecting pagination provider
         */
        private readonly paginationProvider: PaginationProvider,

        /**
         * Inject createPostProvider
         */
        private readonly createPostProvider: CreatePostProvider,
    ) { }

    /**
     * Creating new posts
     */
    public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
        return await this.createPostProvider.create(createPostDto, user);
      }

    public async findAll(postQuery: GetPostsDto, userId: string):Promise<Paginated<Post>> {
        const limit = postQuery.limit;
        const page = postQuery.page;

        return await this.paginationProvider.paginateQuery(
            { limit, page },
            this.postsRepository,
        );
    }

    public async update(patchPostDto: PatchPostDto) {

        let tags = undefined;
        let post = undefined;

        //Find the tags
        try {
            tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
        } catch (error) {
            throw new RequestTimeoutException('Unable to process ur request at the moment, please try later')
        }

        /**
         * Number of the tags should be equal
         */

        if (!tags || tags.length !== patchPostDto.tags.length) {
            throw new BadRequestException(
                'Please check ut tag Ids and ensure they are correct'
            )
        }
        //Find the post
        try {
            post = await this.postsRepository.findOneBy({
                id: patchPostDto.id,
            })
        } catch (error) {
            throw new RequestTimeoutException('Unable to process ur request at the moment, please try later')
        }

        if (!post) {
            throw new BadRequestException('The post Id does not exist')
        }

        //Update the propereties
        post.title = patchPostDto.title ?? post.title;
        post.content = patchPostDto.content ?? post.content;
        post.status = patchPostDto.status ?? post.status;
        post.postType = patchPostDto.postType ?? post.postType;
        post.slug = patchPostDto.slug ?? post.slug;
        post.featuredImageUrls = patchPostDto.featuredImageUrls ?? post.featuredImageUrls;
        post.publishOn = patchPostDto.publishOn ?? post.publishOn;

        //Assign the new tags
        post.tags = tags;
        //Save the post and return
        try {
            await this.postsRepository.save(post);
        } catch (error) {
            throw new RequestTimeoutException('Unable to process ur request at the moment, please try later')
        }

        return post;
    }

    public async delete(id: number) {
        //Deleting the post
        await this.postsRepository.delete(id);

        //confiramtion
        return { deleted: true, id };
    }
}
