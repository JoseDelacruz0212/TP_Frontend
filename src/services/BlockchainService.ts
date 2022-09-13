import blockchainClient from "../config/httpClients/blockchainClient";
import {PointsGenerated} from "../types/communication/responses/points-generated";
import AuthorizationService from "./AuthorizationService";

class BlockchainService {
    public async getByUserId(userId: string) {
        return blockchainClient.get(`/history/${userId}`);
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
}

export default new BlockchainService();
