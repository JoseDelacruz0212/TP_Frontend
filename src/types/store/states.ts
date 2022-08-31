import {PaginatedResponse} from "../communication/responses/pagination";

export type TableDataState<T, F> = {
    filters: F;
    isLoading?: boolean;
    items?: PaginatedResponse<T>;
    error?: string | null;
    isFilterActivated?: boolean;
    page?: number;
    pageSize?: number;
}