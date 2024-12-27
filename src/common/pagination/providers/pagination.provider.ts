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
    ) {}

    public async paginateQuery<T extends ObjectLiteral>(
        paginationQuery: PaginationQueryDto,
        repository: Repository<T>,
    ): Promise<Paginated<T>> {
        // Устанавливаем значения по умолчанию
        const limit = paginationQuery.limit || 10;
        const page = paginationQuery.page || 1;

        // Получаем данные и общее количество элементов
        const [data, totalItems] = await repository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        // Генерируем базовый URL
        const baseURL = `${this.request.protocol}://${this.request.headers.host}`;
        const url = new URL(this.request.url, baseURL);

        // Вычисляем общее количество страниц
        const totalPages = Math.ceil(totalItems / limit);

        // Рассчитываем ссылки на предыдущую и следующую страницы
        const nextPage = page < totalPages ? page + 1 : totalPages;
        const perviousPage = page > 1 ? page - 1 : 1;

        return {
            data,
            meta: {
                itemsPerPage: limit,
                totalItem: totalItems,
                currentPage: page,
                totalPages,
            },
            links: {
                first: `${url.origin}${url.pathname}?limit=${limit}&page=1`,
                last: `${url.origin}${url.pathname}?limit=${limit}&page=${totalPages}`,
                current: `${url.origin}${url.pathname}?limit=${limit}&page=${page}`,
                next: `${url.origin}${url.pathname}?limit=${limit}&page=${nextPage}`,
                pervious: `${url.origin}${url.pathname}?limit=${limit}&page=${perviousPage}`,
            },
        };
    }
}
