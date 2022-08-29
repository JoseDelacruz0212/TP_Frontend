import {Course, CourseOption} from "../communication/types/responses/course";

class CourseService {
    async getCourses(): Promise<Course[]> {
        return [
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
        ]
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