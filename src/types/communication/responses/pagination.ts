export type Pagination = {
    page: number;
    pageSize: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    lastPage: number;
};

export type PaginatedResponse<T> = {
    data: T[],
    pagination: Pagination
};
