import {Filter} from "./requests/course";
import {PaginatedResponse} from "./responses/pagination";
import {Entity} from "./responses/entity";

export interface Service {
    getData: (filters: Filter, page?: number, pageSize?: number) => Promise<PaginatedResponse<Entity>>
};
