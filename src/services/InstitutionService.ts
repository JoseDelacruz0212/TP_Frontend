import {Institution, InstitutionCreated} from "../types/communication/responses/institutions";
import {CrudService} from "../types/communication/crud-service";
import {Filter} from "../types/communication/requests/filter";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {InstitutionFilter} from "../types/communication/requests/institutions";
import {Entity} from "../types/communication/responses/entity";

class InstitutionService extends CrudService<Institution, InstitutionFilter> {
    async getData(filters: Filter, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Institution>> {
        const filtered = (i: Institution[]) => this.getPaginatedData(i, filters as InstitutionFilter, page, pageSize);
        return this.get<Institution[], PaginatedResponse<Institution>>('/institution',filtered);
    }

    async deleteItem(id: string) {
        return this.delete(`/institution/${id}`, () => id);
    }

    async saveItem(item: Entity) {
        if (!item.id) {
            return this.post<InstitutionCreated, Institution, string>('/institution', item as Institution,
                    response => response.newInstitution.id!
            );
        } else {
            return this.put(`/institution/${item.id}`, item, () => item.id!);
        }
    }

    protected applyFilters(data: Institution[], filters: InstitutionFilter): Institution[] {
        const institutionFilter: InstitutionFilter = { ...filters } as InstitutionFilter;

        return data
            .filter((institution) => !institutionFilter.name || institution.name.toLowerCase().includes(institutionFilter.name.toLowerCase()))
            .filter((institution) => !institutionFilter.direction || institution.direction.toLowerCase().includes(institutionFilter.direction.toLowerCase()))
            .filter((institution) => !institutionFilter.code || institution.code.toLowerCase().includes(institutionFilter.code.toLowerCase()))
            .filter((institution) => !institutionFilter.createdBy || institution.createdBy?.toLowerCase().includes(institutionFilter.createdBy.toLowerCase()))
    }
}

export default new InstitutionService();
