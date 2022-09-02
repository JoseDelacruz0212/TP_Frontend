import {CrudService} from "../types/communication/crud-service";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {Course} from "../types/communication/responses/courses";
import {CourseFilter} from "../types/communication/requests/course";

class CourseService extends CrudService<Course, CourseFilter> {
    public async getData(filters: CourseFilter, page: number = 1, pageSize: number = 10) {
        const filter = (i: Course[]) => this.getPaginatedData(i, filters, page, pageSize);
        return this.get<Course[], PaginatedResponse<Course>>('/course', filter);
    }

    public async deleteItem(id: string) {
        return this.delete(`/course/${id}`, () => id);
    }

    protected updateItem(item: Course) {
        return this.put(`/course/${item.id}`, item, () => item.id!);
    }

    protected createItem(item: Course) {
        return this.post<any, Course, string>('/course', item,
            response => {
                console.log(response);
                return "";
            }
        );
    }

    protected applyFilters(data: Course[], filters: CourseFilter) {
        return data
            .filter((institution) => !filters.name || institution.name.toLowerCase().includes(filters.name.toLowerCase()))
    }
}

export default new CourseService();
