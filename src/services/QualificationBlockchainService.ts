import {FetchService} from "./FetchService";
import {Qualification} from "../types/communication/responses/qualification";
import {QualificationFilter} from "../types/communication/requests/qualification";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {PointsGenerated} from "../types/communication/responses/points-generated";
import AuthorizationService from "./AuthorizationService";
import blockchainClient from "../config/httpClients/blockchainClient";

class QualificationBlockchainService extends FetchService<Qualification, QualificationFilter> {
    getData(filters: QualificationFilter, page: number = 1, pageSize: number = 10): Promise<Qualification[] | PaginatedResponse<Qualification>> {
        if (filters.userId) {
            return blockchainClient.get<any>(`/history/${filters.userId}`)
                .then(({data: { response }}) => this.getPaginatedData(response, filters, page, pageSize))
                .catch(() => Promise.reject("Ocurrió un error al tratar de obtener las calificaciones"));
        } else return new Promise(resolve => resolve([]));
    }

    public async addTransaction(pointsGenerated: PointsGenerated) {
        const userId = AuthorizationService.getUserId();

        return blockchainClient.post('/addTransaction', {
            carid: userId,
            make: pointsGenerated.course,
            model: pointsGenerated.evaluation,
            colour: pointsGenerated.institution,
            owner: pointsGenerated.points
        });
    }

    protected applyFilters(data: Qualification[], filters: QualificationFilter): Qualification[] {
        return data;
    }
}

export default new QualificationBlockchainService();
