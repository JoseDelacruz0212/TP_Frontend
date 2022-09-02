import { v4 as uuid } from 'uuid';

import {Institution} from "../types/communication/responses/institutions";
import {Service} from "../types/communication/service";
import {Filter} from "../types/communication/requests/filter";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {InstitutionFilter} from "../types/communication/requests/institutions";
import {Entity} from "../types/communication/responses/entity";

class InstitutionService implements Service {
    private institutions: Institution[] = [...Array(50)].map((x, index) => ({
        id: uuid(),
        name: 'Institution ' + (index + 1),
        direction: 'Address ' + (index + 1),
        code: 'Code ' + (index + 1),
        createdBy: 'admin@gmail.com',
        updatedBy: 'admin@gmail.com',
        createdOn: '2022-08-22',
        updatedOn: '2022-08-22'
    }));

    async getData(filters: Filter, page?: number, pageSize?: number): Promise<PaginatedResponse<Institution>> {
        const institutionFilter: InstitutionFilter = { ...filters } as InstitutionFilter;

        const filteredData = this.institutions
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
        }
    }

    async deleteItem(id: string) {
        this.institutions = this.institutions.filter(x => x.id !== id);
        return id;
    }

    async saveItem(item: Entity) {
        const institution: Institution = item as Institution;

        const existingInstitution = this.institutions.find(x => x.id === institution.id);

        if (!existingInstitution) {
            const newInstitution = { ...institution, id: uuid() };
            this.institutions = [...this.institutions, newInstitution];

            return newInstitution.id;
        }
        else {
            this.institutions = this.institutions.map(x => {
                if (x.id !== existingInstitution.id) return x;

                return {
                    ...institution,
                    updatedBy: 'me',
                    updatedOn: new Date().toString()
                };
            });

            return existingInstitution.id as string;
        }
    }
}

export default new InstitutionService();
