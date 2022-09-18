import {FetchService} from "./FetchService";
import {APIQualification, createFrom, Qualification} from "../types/communication/responses/qualification";
import {QualificationFilter} from "../types/communication/requests/qualification";
import httpClient from "../config/httpClients/httpClient";
import {PaginatedResponse} from "../types/communication/responses/pagination";

class QualificationService extends FetchService<Qualification, QualificationFilter> {
    getData(filters: QualificationFilter, page: number = 1, pageSize: number = 10): Promise<Qualification[] | PaginatedResponse<Qualification>> {
        return httpClient.get<APIQualification[]>(`/user-evaluation/ByEvaluation/${filters.assessmentId}`)
            .then(({ data }) => this.getPaginatedData(data.map(x => createFrom(x)), filters, page, pageSize))
            .catch(() => Promise.reject("Ocurrió un error al tratar de obtener las calificaciones"));
    }

    protected applyFilters(data: Qualification[], filters: QualificationFilter): Qualification[] {
        return data;
    }
}

export default new QualificationService();
