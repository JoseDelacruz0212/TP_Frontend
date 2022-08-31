import {PaginatedResponse} from "./responses/pagination";
import {Entity} from "./responses/entity";
import {Filter} from "./requests/filter";

export interface Service {
    getData: (filters: Filter, page?: number, pageSize?: number) => Promise<PaginatedResponse<Entity>>;
    deleteItem: (id: string) => Promise<string>;
    saveItem: (item: Entity) => Promise<string>;
};
