import moment from "moment";

import {CrudService} from "./CrudService";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {Assessment, AssessmentCreated} from "../types/communication/responses/assessment";
import {AssessmentFilter} from "../types/communication/requests/asessments";
import {PointsGenerated} from "../types/communication/responses/points-generated";

class AssessmentService extends CrudService<Assessment, AssessmentFilter> {
    public async getData(filters: AssessmentFilter, page: number = 1, pageSize: number = 10) {
        const filter = (i: Assessment[]) => this.getPaginatedData(i, filters, page, pageSize);

        if (!filters.courseId) {
            return this.get<Assessment[], PaginatedResponse<Assessment>>('/evaluation', filter);
        } else {
            return this.get<Assessment[], PaginatedResponse<Assessment>>(`/evaluation/byCourse/${filters.courseId}`, filter);
        }
    }

    public async getById(id: string) {
        return this.get<Assessment>(`/evaluation/${id}`);
    }

    public async deleteItem(id: string) {
        return this.delete(`/evaluation/${id}`, () => id);
    }

    public async generatePoints(evaluationId: string, json: string) {
        return this.post<PointsGenerated, { evaluationId: string, json: string }, PointsGenerated>(
            '/evaluation/GeneratePoints', { evaluationId, json }, response => response
        );
    }

    protected updateItem(item: Assessment) {
        return this.put(`/evaluation/${item.id}`, {
            ...item,
            availableOn: moment(item.availableOn).toISOString()
        }, () => item.id!);
    }

    protected createItem(item: Assessment) {
        const newItem = {
            ...item,
            availableOn: moment(item.availableOn).toISOString()
        };

        return this.post<AssessmentCreated, Assessment, string>('/evaluation', newItem,
            response => response.newEvaluation.id!
        );
    }

    protected applyFilters(data: Assessment[], filters: AssessmentFilter) {
        return data
            .filter((institution) => !filters.name || institution.name.toLowerCase().includes(filters.name.toLowerCase()))
    }
}

export default new AssessmentService();