import {Course, CourseOption} from "../types/communication/responses/course";
import {CourseFilter, Filter} from "../types/communication/requests/course";
import {PaginatedResponse} from "../types/communication/responses/pagination";
import {Service} from "../types/communication/service";

class CourseService implements Service {
    async getData(filters: Filter, page?: number, pageSize?: number): Promise<PaginatedResponse<Course>> {
        const courseFilter: CourseFilter = { ...filters } as CourseFilter;

        const courses = [
            {
                id: '1',
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: '2',
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: '3',
                name: 'Biología',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: '4',
                name: 'Comunicación',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: '5',
                name: 'Arte',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            }
        ];

        const filteredCourses = courses
            .filter((course: any) => !courseFilter.name || course.name.toLowerCase().includes(courseFilter.name.toLowerCase()))
            .filter((course: any) => !courseFilter.startDate || new Date(courseFilter.startDate) <= new Date(course.startDate))
            .filter((course: any) => !courseFilter.endDate || new Date(courseFilter.endDate) >= new Date(course.endDate));

        return {
            data: filteredCourses,
            pagination: {
                page: page || 1,
                pageSize: pageSize || 10,
                totalItems: 5,
                hasNext: false,
                hasPrev: false,
                lastPage: 1
            }
        }
    }

    async getCoursesForCombo(): Promise<CourseOption[]> {
        return [
            {
                key: '1',
                value: 'Matemática'
            },
            {
                key: '2',
                value: 'Química'
            },
            {
                key: '3',
                value: 'Biología'
            },
            {
                key: '4',
                value: 'Comunicación'
            },
            {
                key: '5',
                value: 'Arte'
            }
        ]
    }
}

export default new CourseService();