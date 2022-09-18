import {Institution, InstitutionOption} from "../types/communication/responses/institutions";
import {CrudService} from "./CrudService";
import {InstitutionFilter} from "../types/communication/requests/institutions";
import httpClient from "../config/httpClients/httpClient";
import {CourseOption} from "../types/communication/responses/courses";

class InstitutionService extends CrudService<Institution, InstitutionFilter> {
    public async getData(filters: InstitutionFilter, page: number = 1, pageSize: number = 10) {
        return httpClient.get<Institution[]>('/institution')
            .then(({ data }) => this.getPaginatedData(data, filters, page, pageSize))
            .catch(() => Promise.reject("Ocurrió un error al tratar de obtener las instituciones"));
    }

    public async getInstitutionsForCombo() {
        return httpClient.get<InstitutionOption[]>('/institution')
            .then(response => response.data)
            .catch(() => Promise.reject("Ocurrió un error al tratar de obtener las instituciones"));
    }

    public async deleteItem(id: string) {
        return httpClient.delete(`/institution/${id}`)
            .then(() => "La institución se eliminó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de eliminar la institución"));
    }

    protected updateItem(item: Institution) {
        return httpClient.put(`/institution/${item.id}`, item)
            .then(() => "La institución se actualizó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de actualizar la institución"));
    }

    protected createItem(item: Institution) {
        return httpClient.post('/institution', item)
            .then(() => "La institución se creó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de crear la institución"));
    }

    protected applyFilters(data: Institution[], filters: InstitutionFilter) {
        return data
            .filter((institution) => !filters.name || institution.name.toLowerCase().includes(filters.name.toLowerCase()))
            .filter((institution) => !filters.direction || institution.direction.toLowerCase().includes(filters.direction.toLowerCase()))
            .filter((institution) => !filters.code || institution.code.toLowerCase().includes(filters.code.toLowerCase()))
    }
}

export default new InstitutionService();
