import {PaginatedResponse} from "../types/communication/responses/pagination";
import {Entity} from "../types/communication/responses/entity";
import {Filter} from "../types/communication/requests/filter";
import {FetchService} from "./FetchService";

export abstract class CrudService<T extends Entity, F extends Filter> extends FetchService<T, F>{
    public abstract deleteItem(id: string): Promise<string>;

    public saveItem(item: T): Promise<string> {
        return !item.id ? this.createItem(item) : this.updateItem(item);
    };

    protected abstract updateItem(item: T): Promise<string>;
    protected abstract createItem(item: T): Promise<string>;
};
