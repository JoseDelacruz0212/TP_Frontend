import {Service} from "../types/communication/service";
import {v4 as uuid} from 'uuid';
import {Filter} from "../types/communication/requests/filter";
import {Entity} from "../types/communication/responses/entity";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import ICourses from "../types/communication/responses/courses";
import {CourseFilter} from "../types/communication/requests/course";

class CourseService implements Service {
    private courses: ICourses[] = [...Array(30)].map((x, index) => ({
        id: uuid(),
        name: 'Course ' + (index + 1),
        institution: 'Institution ' + (index + 1),
        description: 'BLABLABLABLABL',
        createdBy: 'Person ' + (index + 1),
        updatedBy: 'Person ' + (index + 1),
        updatedAt: new Date('08/05/2005'),
        createdAt: new Date('07/06/2008')
    }));

    async deleteItem(id: string) {
        this.courses = this.courses.filter(x => x.id !== id);
        return id;
    }

    async getData(filters: Filter, page: number | undefined, pageSize: number | undefined): Promise<PaginatedResponse<Entity>> {
        const courseFilter: CourseFilter = { ...filters } as CourseFilter;

        const filteredData = this.courses
            .filter((course) => !courseFilter.name || course.name.toLowerCase().includes(courseFilter.name.toLowerCase()))
            .filter((course) => !courseFilter.institution || course.institution.toLowerCase().includes(courseFilter.institution.toLowerCase()))

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

    async saveItem(item: Entity) {
        const course: ICourses = item as ICourses;

        const existingCourse = this.courses.find(x => x.id === course.id);

        if (!existingCourse) {
            const newCourse = {...course, id: uuid()};
            this.courses = [...this.courses, newCourse];

            return newCourse.id;
        } else {
            this.courses = this.courses.map(x => {
                if (x.id !== existingCourse.id) return x;
                return course;
            });

            return existingCourse.id as string;
        }
    }
}

export default new CourseService();
