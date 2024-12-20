import { Injectable, Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import {REQUEST} from '@nestjs/core'
import { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';


@Injectable()
export class PaginationProvider {
    constructor(
        /**
         * Inject request
         */
        @Inject(REQUEST)
        private readonly request: Request,
    ){}
    public async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>,
    ): Promise<Paginated<T>> {
        let limit = paginationQuery.limit;
        let page = paginationQuery.page;

        const [data, totalItems] = await repository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        let results = await repository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        
        /**
         * Create request URLS
        */
       const baseURL = this.request.protocol + '://' + this.request.headers.host + '/';
       const newUrl = new URL(this.request.url, baseURL);
       
       console.log(newUrl);
       
       const totalPages = Math.ceil(totalItems / limit);

       const nextPage = page === totalPages ? page : page + 1;

       const perviousPage = page === 1 ? page : page - 1;

       return {
        data,
        meta: {
            itemsPerPage: limit,
            totalItem: totalItems, // Здесь исправлено
            currentPage: page,
            totalPages,
        },
        links: {
            first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
            last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
            current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${page}`,
            next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
            pervious: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${perviousPage}`,
        },
    };
    }
}
