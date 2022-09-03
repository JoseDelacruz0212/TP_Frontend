import {CrudService} from "../types/communication/crud-service";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {User} from "../types/communication/responses/user";
import {UserFilter} from "../types/communication/requests/user";

class UserService extends CrudService<User, UserFilter> {
    public async getData(filters: UserFilter, page: number = 1, pageSize: number = 10) {
        const filter = (i: User[]) => this.getPaginatedData(i, filters, page, pageSize);
        return this.get<User[], PaginatedResponse<User>>('/user/all', filter);
    }

    public async deleteItem(id: string) {
        return this.delete(`/user/${id}`, () => id);
    }

    protected updateItem(item: User) {
        return this.put(`/user/${item.id}`, item, () => item.id!);
    }

    protected createItem(item: User) {
        return this.post<any, User, string>('/user', item,
            response => {
                console.log(response);
                return "";
            }
        );
    }

    protected applyFilters(data: User[], filters: UserFilter) {
        const newData = data.map(x => ({ ...x, id: x.idUser }) as User);

        return newData
            .filter((institution) => !filters.name || institution.name.toLowerCase().includes(filters.name.toLowerCase()))
            .filter((institution) => !filters.lastName || institution.lastName.toLowerCase().includes(filters.lastName.toLowerCase()))
            .filter((institution) => !filters.email || institution.email.toLowerCase().includes(filters.email.toLowerCase()))
            .filter((institution) => !filters.institution || institution.institution!.name.toLowerCase().includes(filters.institution.toLowerCase()))
    }
}

export default new UserService();
