import {FetchService} from "./FetchService";
import {Qualification} from "../types/communication/responses/qualification";
import {QualificationFilter} from "../types/communication/requests/qualification";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {PointsGenerated} from "../types/communication/responses/points-generated";
import AuthorizationService from "./AuthorizationService";
import blockchainClient from "../config/httpClients/blockchainClient";
import {Assessment} from "../types/communication/responses/assessment";

class QualificationBlockchainService extends FetchService<Qualification, QualificationFilter> {
    getData(filters: QualificationFilter, page: number = 1, pageSize: number = 10): Promise<Qualification[] | PaginatedResponse<Qualification>> {
        if (filters.userId) {
            return blockchainClient.get<any>(`/history/${filters.userId}`)
                .then(({data: { response }}) => this.getPaginatedData(response, filters, page, pageSize))
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener las calificaciones"));
        } else return new Promise(resolve => resolve([]));
    }

    public async addTransaction(pointsGenerated: PointsGenerated, assessment: Assessment) {
        return blockchainClient.post('/addTransaction', {
            userId: AuthorizationService.getUserId(),
            courseName: assessment.courses?.name,
            courseId: assessment.courses?.id,
            evaluationName: assessment.name,
            evaluationId: assessment.id,
            institutionName: assessment.courses?.institution?.name,
            institutionId: assessment.courses?.institutionId,
            time: assessment.availableOn,
            points: pointsGenerated.points,
            grade: assessment.courses?.grade,
            section: assessment.courses?.section
        });
    }

    protected applyFilters(data: Qualification[], filters: QualificationFilter): Qualification[] {
        return data;
    }
}

export default new QualificationBlockchainService();
