import {Institution, InstitutionCreated} from "../types/communication/responses/institutions";
import {Service} from "../types/communication/service";
import {Filter} from "../types/communication/requests/filter";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {InstitutionFilter} from "../types/communication/requests/institutions";
import {Entity} from "../types/communication/responses/entity";

import httpClient from "../config/httpClients/httpClient";

class InstitutionService implements Service {
    async getData(filters: Filter, page?: number, pageSize?: number): Promise<PaginatedResponse<Institution>> {
        return httpClient.get<Institution[]>('/institution').then(
            response => {
                const institutionFilter: InstitutionFilter = { ...filters } as InstitutionFilter;

                const institutions = response.data;

                const filteredData = institutions
                    .filter((institution) => !institutionFilter.name || institution.name.toLowerCase().includes(institutionFilter.name.toLowerCase()))
                    .filter((institution) => !institutionFilter.direction || institution.direction.toLowerCase().includes(institutionFilter.direction.toLowerCase()))
                    .filter((institution) => !institutionFilter.code || institution.code.toLowerCase().includes(institutionFilter.code.toLowerCase()))
                    .filter((institution) => !institutionFilter.createdBy || institution.createdBy?.toLowerCase().includes(institutionFilter.createdBy.toLowerCase()))

                const startIndex = ((page || 1) - 1) * (pageSize || 10);
                const endIndex = startIndex + (pageSize || 10);

                return {
                    data: filteredData.slice(startIndex, endIndex),
                    pagination: {
                        page: page || 1,
                        pageSize: pageSize || 10,
                        totalItems: filteredData.length,
                        hasNext: (page || 1) < Math.ceil(filteredData.length / (pageSize || 10)),
                        hasPrev: (page || 1) > 1,
                        lastPage: Math.ceil(filteredData.length / (pageSize || 10))
                    }
                } as PaginatedResponse<Institution>
            },
            error => Promise.reject(error)
        );
    }

    async deleteItem(id: string) {
        return httpClient.delete(`/institution/${id}`).then(
            () => id,
            error => Promise.reject(error)
        );
    }

    async saveItem(item: Entity) {
        if (!item.id) {
            return httpClient.post<InstitutionCreated>('/institution', item).then(
                response => response.data.newInstitution.id!,
                error => Promise.reject(error)
            );
        } else {
            return httpClient.put(`/institution/${item.id}`, item).then(
                () => item.id!,
                error => Promise.reject(error)
            );
        }
    }
}

export default new InstitutionService();
