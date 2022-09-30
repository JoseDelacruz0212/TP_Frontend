import {CrudService} from "./CrudService";
import {Course, CourseOption} from "../types/communication/responses/courses";
import {CourseFilter} from "../types/communication/requests/course";
import httpClient from "../config/httpClients/httpClient";

class CourseService extends CrudService<Course, CourseFilter> {
    public async getData(filters: CourseFilter, page: number = 1, pageSize: number = 10) {
        return httpClient.get<Course[]>('/course')
            .then(({ data }) => this.getPaginatedData(data, filters, page, pageSize))
            .catch(() => Promise.reject("Ocurrió un error al tratar de obtener los cursos"));
    }

    public async getCoursesForCombo() {
        return httpClient.get<CourseOption[]>('/course')
            .then(response => response.data)
            .catch(() => Promise.reject("Ocurrió un error al tratar de obtener los cursos"));
    }

    public async deleteItem(id: string) {
        return httpClient.delete(`/course/${id}`)
            .then(() => "El curso se eliminó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de eliminar el curso"));
    }

    protected updateItem(item: Course) {
        return httpClient.put(`/course/${item.id}`, item)
            .then(() => "El curso se actualizó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de actualizar el curso"));
    }

    protected createItem(item: Course) {
        return httpClient.post('/course', item)
            .then(() => "El curso se creó exitosamente")
            .catch(() => Promise.reject("Ocurrió un error al tratar de crear el curso"));
    }

    protected applyFilters(data: Course[], filters: CourseFilter) {
        return data
            .filter((institution) => !filters.name || institution.name.toLowerCase().includes(filters.name.toLowerCase()))
            .filter((institution) => !filters.code || institution.code.toLowerCase().includes(filters.code.toLowerCase()))
            .filter((institution) => !filters.grade || institution.grade.toLowerCase().includes(filters.grade.toLowerCase()))
            .filter((institution) => !filters.section || institution.section.toLowerCase().includes(filters.section.toLowerCase()))
            .filter((institution) => !filters.institution || institution.institution!.name.toLowerCase().includes(filters.institution.toLowerCase()))
    }
}

export default new CourseService();
