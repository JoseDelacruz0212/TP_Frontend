import {CrudService} from "./CrudService";

import {Profile, User} from "../types/communication/responses/user";
import {UserFilter} from "../types/communication/requests/user";
import {UserCourse} from "../types/communication/responses/user-course";

import httpClient from "../config/httpClients/httpClient";

class UserService extends CrudService<User, UserFilter> {
    public async getData(filters: UserFilter, page: number = 1, pageSize: number = 10) {
        if (!filters.courseId) {
            return httpClient.get<User[]>('/user/all')
                .then(({ data }) => this.getPaginatedData(data.map((x: any) => ({ ...x, role: (x.roles && x.roles[0]) || '' })), filters, page, pageSize))
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener los usuarios"));
        } else {
            return httpClient.get<UserCourse[]>(`/user-course/getAllByCourse/${filters.courseId}`)
                .then(({ data }) => this.getPaginatedData(data.map((x: any) => x.user), filters, page, pageSize))
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener los usuarios"));
        }
    }

    getCurrentProfile() {
        return httpClient.get<Profile>('auth/profile')
            .then(({ data }) => data.user)
            .catch(() => Promise.reject("Ocurrió un error al tratar de obtener el perfíl del usuario"));
    }

    updateUserAvatar(userId: string, user: User) {
        return httpClient.patch('user/updateAvatar/' + userId, user)
            .then(() => "La foto de perfil se actualizó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de actualizar la foto de perfil"));
    }

    public async assignUserToCourse(userId: string, courseId: string) {
        return httpClient.post('/user-course', { userId, courseId })
            .then(() => "La asignación se completó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de realizar la asignación"));
    }

    public async deleteItem(id: string) {
        return httpClient.delete(`/user/${id}`)
            .then(() => "El usuario se eliminó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de eliminar al usuario"));
    }

    protected updateItem(item: User) {
        return httpClient.put(`/user/${item.id}`, item)
            .then(() => "El usuario se actualizó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de actualizar el usuario"));
    }

    protected createItem(item: User) {
        return httpClient.post('/user', item)
            .then(() => "El usuario se creó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de crear al usuario"));
    }

    public approveUser(id: string) {
        return httpClient.put(`/user/${id}`, { status: true })
            .then(() => "La aprobación se completó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de aprobar al usuario"));
    }

    public revokeUser(id: string) {
        return httpClient.put(`/user/${id}`, { status: false })
            .then(() => "La desaprobación se completó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de desaprobar al usuario"));
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
