import {CrudService} from "./CrudService";

import {PaginatedResponse} from "../types/communication/responses/pagination";
import {Profile, User} from "../types/communication/responses/user";
import {UserFilter} from "../types/communication/requests/user";
import {UserCourse} from "../types/communication/responses/user-course";

import httpClient from "../config/httpClients/httpClient";

class UserService extends CrudService<User, UserFilter> {
    public async getData(filters: UserFilter, page: number = 1, pageSize: number = 10) {
        const filter = (i: User[]) => this.getPaginatedData(i, filters, page, pageSize);

        if (!filters.courseId) {
            return this.get<User[], PaginatedResponse<User>>('/user/all', filter);
        } else {
            return this.get<UserCourse[], PaginatedResponse<User>>(`/user-course/getAllByCourse/${filters.courseId}`,
                    response => filter(response.map((x: any) => x.user)));
        }
    }

    getCurrentProfile() {
        return this.get<Profile>('auth/profile').then((data) => data.user)
    }

    updateUserAvatar(userId: string, user: User) {
        return httpClient.patch('user/updateAvatar/' + userId, user)
            .then(
                () => userId,
                error => Promise.reject(error)
            )
    }

    public async assignUserToCourse(userId: string, courseId: string) {
        return this.post('/user-course', { userId, courseId }, () => userId);
    }

    public async deleteItem(id: string) {
        return this.delete(`/user/${id}`, () => id);
    }

    protected updateItem(item: User) {
        return this.put(`/user/${item.id}`, item, () => item.id!);
    }

    protected createItem(item: User) {
        return this.post('/user', item, () => item.id!);
    }

    public approveUser(id: string) {
        return this.put(`/user/${id}`, { status: true }, () => id)
    }

    public revokeUser(id: string) {
        return this.put(`/user/${id}`, { status: false }, () => id)
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
