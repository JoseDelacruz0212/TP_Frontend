import moment from "moment";

import {CrudService} from "./CrudService";
import {Assessment, createFrom} from "../types/communication/responses/assessment";
import {AssessmentFilter} from "../types/communication/requests/asessments";
import {PointsGenerated} from "../types/communication/responses/points-generated";
import httpClient from "../config/httpClients/httpClient";
import AuthorizationService from "./AuthorizationService";
import {APIQualification} from "../types/communication/responses/qualification";

class AssessmentService extends CrudService<Assessment, AssessmentFilter> {
    public async getData(filters: AssessmentFilter, page: number = 1, pageSize: number = 10) {
        if (!filters.courseId) {
            return httpClient.get<Assessment[]>('/evaluation')
                .then(({ data }) => this.getPaginatedData(data, filters, page, pageSize))
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener las evaluaciones"));
        } else {
            return httpClient.get<Assessment[]>(`/evaluation/byCourse/${filters.courseId}`)
                .then(({ data }) => this.getPaginatedData(data, filters, page, pageSize))
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener las evaluaciones"));
        }
    }

    public async getById(id: string, isForStudent: boolean = false) {
        if (!isForStudent) {
            return httpClient.get<Assessment>(`/evaluation/${id}`)
                .then(({data}) => data)
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener la evaluación"));
        } else {
            return httpClient.get<APIQualification[]>(`/user-evaluation/byUser/${id}/${AuthorizationService.getUserId()}`)
                .then(({data}) => data ? createFrom(data[0]) : undefined)
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener la evaluación"));
        }
    }

    public async deleteItem(id: string) {
        return httpClient.delete(`/evaluation/${id}`)
            .then(() => "La evaluación se eliminó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de eliminar la evaluación"));
    }

    public async generatePoints(evaluationId: string, json: string) {
        return httpClient.post<PointsGenerated>('/evaluation/GeneratePoints', { evaluationId, json })
            .then(({ data }) => data)
            .catch(() => Promise.reject("Ocurrió un error al tratar de asignar una puntación a la evaluación"));
    }

    public async generateRequest(evaluationId: string) {
        return httpClient.post(`evaluation/generateRequest`, { evaluationId })
            .then(() => "La solicitud fue enviada exitosamente")
            .catch(() => Promise.reject("Ocurrió un problema al tratar de enviar la solicitud"));
    }

    protected updateItem(item: Assessment) {
        return httpClient.put(`/evaluation/${item.id}`, { ...item, availableOn: moment(item.availableOn).toISOString()})
            .then(() => "La evaluación se actualizó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de actualizar la evaluación"));
    }

    protected createItem(item: Assessment) {
        return httpClient.post(`/evaluation`, { ...item, availableOn: moment(item.availableOn).toISOString()})
            .then(() => "La evaluación se creó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de crear la evaluación"));
    }

    protected applyFilters(data: Assessment[], filters: AssessmentFilter) {
        return data
            .filter((institution) => !filters.name || institution.name.toLowerCase().includes(filters.name.toLowerCase()))
    }
}

export default new AssessmentService();
