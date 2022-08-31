import {PaginatedResponse} from "../communication/responses/pagination";

export type PaginationOptions = {
    page?: number;
    pageSize?: number;
}

export type TableDataState<T, F> = {
    filters: F;
    isLoading?: boolean;
    items?: PaginatedResponse<T>;
    error?: string | null;
    isFilterActivated?: boolean;
    paginationOptions?: PaginationOptions;
}