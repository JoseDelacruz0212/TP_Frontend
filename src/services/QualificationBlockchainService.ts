import { v4 as uuid } from 'uuid';

import {FetchService} from "./FetchService";
import {
    mapToQualificationGroup, Qualification,
    QualificationGroup
} from "../types/communication/responses/qualification";
import {QualificationFilter} from "../types/communication/requests/qualification";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {PointsGenerated} from "../types/communication/responses/points-generated";
import AuthorizationService from "./AuthorizationService";
import blockchainClient from "../config/httpClients/blockchainClient";
import {Assessment} from "../types/communication/responses/assessment";

class QualificationBlockchainService extends FetchService<QualificationGroup, QualificationFilter> {
    getData(filters: QualificationFilter, page: number = 1, pageSize: number = 10): Promise<QualificationGroup[] | PaginatedResponse<QualificationGroup>> {
        if (filters.userId) {
            return blockchainClient.get<{ response: Qualification[] }>(`/history/${filters.userId}`)
                .then(({data: { response }}) => this.getPaginatedData(mapToQualificationGroup(response.map(x => ({ ...x, id: uuid() }))), filters, page, pageSize))
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener las calificaciones"));
        } else return new Promise(resolve => resolve([]));
    }

    public async addTransaction(pointsGenerated: number, assessment: Assessment, id: string) {
        return blockchainClient.post('/addTransaction', {
            userId: AuthorizationService.getUserId(),
            courseName: assessment.courses?.name,
            courseId: assessment.courses?.id,
            evaluationName: assessment.name,
            evaluationId: id,
            institutionName: assessment.courses?.institution?.name,
            institutionId: assessment.courses?.institutionId,
            time: assessment.availableOn,
            points: pointsGenerated,
            grade: assessment.courses?.grade,
            section: assessment.courses?.section
        });
    }

    protected applyFilters(data: QualificationGroup[], filters: QualificationFilter): QualificationGroup[] {
        return data;
    }
}

export default new QualificationBlockchainService();
