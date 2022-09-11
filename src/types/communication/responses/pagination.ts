export interface Pagination {
    page: number;
    pageSize: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    lastPage: number;
};

export interface PaginatedResponse<T> {
    data: T[],
    pagination: Pagination
};
