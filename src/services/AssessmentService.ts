import {CrudService} from "../types/communication/crud-service";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {Assessment} from "../types/communication/responses/assessment";
import {AssessmentFilter} from "../types/communication/requests/asessments";

class AssessmentService extends CrudService<Assessment, AssessmentFilter> {
    public async getData(filters: AssessmentFilter, page: number = 1, pageSize: number = 10) {
        const filter = (i: Assessment[]) => this.getPaginatedData(i, filters, page, pageSize);
        return this.get<Assessment[], PaginatedResponse<Assessment>>('/evaluation', filter);
    }

    public async deleteItem(id: string) {
        return this.delete(`/evaluation/${id}`, () => id);
    }

    protected updateItem(item: Assessment) {
        return this.put(`/evaluation/${item.id}`, item, () => item.id!);
    }

    protected createItem(item: Assessment) {
        console.log(item);
        return this.post<any, Assessment, string>('/evaluation', item,
            response => {
                console.log(response);
                return "";
            }
        );
    }

    protected applyFilters(data: Assessment[], filters: AssessmentFilter) {
        return data
            .filter((institution) => !filters.name || institution.name.toLowerCase().includes(filters.name.toLowerCase()))
    }
}

export default new AssessmentService();
