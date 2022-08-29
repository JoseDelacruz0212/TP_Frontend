import {Course} from "../communication/types/responses/course";
import { v4 as uuid } from 'uuid';

class CourseService {
    async getCourses(): Promise<Course[]> {
        return [
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
            {
                id: uuid(),
                name: 'Matemática',
                startDate: '2022-04-26',
                endDate: '2022-04-30'
            },
            {
                id: uuid(),
                name: 'Química',
                startDate: '2022-04-4',
                endDate: '2022-04-26'
            },
        ]
    }
}

export default new CourseService();