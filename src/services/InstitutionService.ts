import {Institution, InstitutionCreated, InstitutionOption} from "../types/communication/responses/institutions";
import {CrudService} from "./CrudService";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {InstitutionFilter} from "../types/communication/requests/institutions";

class InstitutionService extends CrudService<Institution, InstitutionFilter> {
    public async getData(filters: InstitutionFilter, page: number = 1, pageSize: number = 10) {
        const filter = (i: Institution[]) => this.getPaginatedData(i, filters, page, pageSize);
        return this.get<Institution[], PaginatedResponse<Institution>>('/institution', filter);
    }

    public async getInstitutionsForCombo() {
        return this.get<InstitutionOption[], InstitutionOption[]>('/institution',
                institutions => institutions);
    }

    public async deleteItem(id: string) {
        return this.delete(`/institution/${id}`, () => id);
    }

    protected updateItem(item: Institution) {
        return this.put(`/institution/${item.id}`, item, () => item.id!);
    }

    protected createItem(item: Institution) {
        return this.post<InstitutionCreated, Institution, string>('/institution', item,
            response => response.newInstitution.id!
        );
    }

    protected applyFilters(data: Institution[], filters: InstitutionFilter) {
        return data
            .filter((institution) => !filters.name || institution.name.toLowerCase().includes(filters.name.toLowerCase()))
            .filter((institution) => !filters.direction || institution.direction.toLowerCase().includes(filters.direction.toLowerCase()))
            .filter((institution) => !filters.code || institution.code.toLowerCase().includes(filters.code.toLowerCase()))
    }
}

export default new InstitutionService();
