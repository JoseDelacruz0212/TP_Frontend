import {PaginatedResponse} from "./responses/pagination";
import {Entity} from "./responses/entity";
import {Filter} from "./requests/filter";

import httpClient from "../../config/httpClients/httpClient";

export abstract class CrudService<T extends Entity, F extends Filter> {
    public abstract getData(filters: F, page?: number, pageSize?: number): Promise<PaginatedResponse<T>>;
    public abstract deleteItem(id: string): Promise<string>;

    public saveItem(item: T): Promise<string> {
        return !item.id ? this.createItem(item) : this.updateItem(item);
    };

    protected abstract updateItem(item: T): Promise<string>;
    protected abstract createItem(item: T): Promise<string>;
    protected abstract applyFilters(data: T[], filters: F): T[];

    protected get<T, K>(url: string, callback: (response: T) => K): Promise<K> {
        return httpClient.get<T>(url).then(
            response => callback(response.data),
            error => Promise.reject(error)
        );
    }

    protected post<T, V, K>(url: string, data: V, callback: (response: T) => K): Promise<K> {
        return httpClient.post<T>(url, data).then(
            response => callback(response.data),
            error => Promise.reject(error)
        );
    }

    protected put<T, V, K>(url: string, data: V, callback: (response: T) => K): Promise<K> {
        return httpClient.put<T>(url, data).then(
            response => callback(response.data),
            error => Promise.reject(error)
        );
    }

    protected delete<T, K>(url: string, callback: (response: T) => K): Promise<K> {
        return httpClient.delete<T>(url).then(
            response => callback(response.data),
            error => Promise.reject(error)
        );
    }

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
