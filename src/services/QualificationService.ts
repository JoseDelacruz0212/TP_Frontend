import {FetchService} from "./FetchService";
import {
    APIQualification, createFrom,
    mapToQualificationGroup,
    QualificationGroup
} from "../types/communication/responses/qualification";
import {QualificationFilter} from "../types/communication/requests/qualification";
import httpClient from "../config/httpClients/httpClient";
import {PaginatedResponse} from "../types/communication/responses/pagination";

class QualificationService extends FetchService<QualificationGroup, QualificationFilter> {
    getData(filters: QualificationFilter, page: number = 1, pageSize: number = 10): Promise<QualificationGroup[] | PaginatedResponse<QualificationGroup>> {
        return httpClient.get<APIQualification[]>(`/user-evaluation/ByEvaluation/${filters.assessmentId}`)
            .then(({ data }) => this.getPaginatedData(mapToQualificationGroup(data.map(createFrom)), filters, page, pageSize))
            .catch(() => Promise.reject("Ocurrió un error al tratar de obtener las calificaciones"));
    }

    protected applyFilters(data: QualificationGroup[], filters: QualificationFilter): QualificationGroup[] {
        return data;
    }
}

export default new QualificationService();
