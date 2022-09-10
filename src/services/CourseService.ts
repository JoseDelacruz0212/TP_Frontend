import {CrudService} from "./CrudService";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {Course, CourseCreated, CourseOption} from "../types/communication/responses/courses";
import {CourseFilter} from "../types/communication/requests/course";

class CourseService extends CrudService<Course, CourseFilter> {
    public async getData(filters: CourseFilter, page: number = 1, pageSize: number = 10) {
        const filter = (i: Course[]) => this.getPaginatedData(i, filters, page, pageSize);
        return this.get<Course[], PaginatedResponse<Course>>('/course', filter);
    }

    public async getCoursesForCombo() {
        return this.get<CourseOption[], CourseOption[]>('/course',
            courses => courses);
    }

    public async deleteItem(id: string) {
        return this.delete(`/course/${id}`, () => id);
    }

    protected updateItem(item: Course) {
        return this.put(`/course/${item.id}`, item, () => item.id!);
    }

    protected createItem(item: Course) {
        return this.post<CourseCreated, Course, string>('/course', item,
            response => response.course.id!
        );
    }

    protected applyFilters(data: Course[], filters: CourseFilter) {
        return data
            .filter((institution) => !filters.name || institution.name.toLowerCase().includes(filters.name.toLowerCase()))
            .filter((institution) => !filters.institution || institution.institution!.name.toLowerCase().includes(filters.institution.toLowerCase()))
    }
}

export default new CourseService();
