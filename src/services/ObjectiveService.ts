import httpClient from "../config/httpClients/httpClient";

import {CrudService} from "./CrudService";
import {Objective} from "../types/communication/responses/objective";
import {ObjectiveFilters} from "../types/communication/requests/objective";
import {PaginatedResponse} from "../types/communication/responses/pagination";

class ObjectiveService extends CrudService<Objective, ObjectiveFilters> {
    public async getData(filters: ObjectiveFilters, page: number = 1, pageSize: number = 10): Promise<Objective[] | PaginatedResponse<Objective>> {
        if (filters.courseId) {
            return httpClient.get<Objective[]>(`/objective/ByCourse/${filters.courseId}`)
                .then(({data}) => this.getPaginatedData(data.map(x => ({ ...x, courseId: filters.courseId })), filters, page, pageSize))
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener los objectivos"));
        } else {
            return new Promise(resolve => resolve([]));
        }
    }

    public async deleteItem(id: string) {
        return httpClient.delete(`/objective/${id}`)
            .then(() => "El objetivo se eliminó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de eliminar el objetivo"));
    }

    protected updateItem(item: Objective) {
        return httpClient.put(`/objective/${item.id}`, item)
            .then(() => "El objetivo se actualizó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de actualizar el objetivo"));
    }

    protected createItem(item: Objective) {
        return httpClient.post('/objective', item)
            .then(() => "El objetivo se creó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de crear el objetivo"));
    }

    protected applyFilters(data: Objective[], filters: ObjectiveFilters) {
        return data;
    }
}

export default new ObjectiveService();
