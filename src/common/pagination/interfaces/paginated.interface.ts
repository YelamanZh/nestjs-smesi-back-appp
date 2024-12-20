export interface Paginated<T>{
    data: T[];
    meta:{
        itemsPerPage: number,    
        totalItem: number,    
        currentPage: number,    
        totalPages: number,    
    };
    links: {
        first: string;
        last: string;
        current: string;
        next: string;
        pervious: string;
    }
}