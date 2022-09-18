import {PaginatedResponse} from "../types/communication/responses/pagination";
import {Entity} from "../types/communication/responses/entity";
import {Filter} from "../types/communication/requests/filter";

export abstract class FetchService<T extends Entity, F extends Filter> {
    public abstract getData(filters: F, page?: number, pageSize?: number): Promise<T[] | PaginatedResponse<T>>;

    protected abstract applyFilters(data: T[], filters: F): T[];

    protected getPaginatedData(data: T[], filters: F, page: number, pageSize: number): PaginatedResponse<T> {
        const filteredData = [...this.applyFilters(data, filters)];

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return {
            data: filteredData.slice(startIndex, endIndex),
            pagination: {
                page: page,
                pageSize: pageSize,
                totalItems: filteredData.length,
                hasNext: page < Math.ceil(filteredData.length / pageSize),
                hasPrev: page > 1,
                lastPage: Math.ceil(filteredData.length / pageSize)
            }
        }
    }
};
