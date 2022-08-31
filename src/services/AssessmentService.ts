import {Assessment} from "../types/communication/responses/assessment";
import { v4 as uuid } from 'uuid';

class AssessmentsService {
    async getAssessments(): Promise<Assessment[]> {
        return [
            {
                id: uuid(),
                name: 'Práctica calificada 1',
                courseId: '1',
                courseName: 'Matemática',
                startDate: '2022-08-26',
                endDate: '2022-08-26',
                status: 1
            },
            {
                id: uuid(),
                courseId: '1',
                name: 'Práctica calificada 2',
                courseName: 'Matemática',
                startDate: '2022-08-26',
                endDate: '2022-08-26',
                status: 2
            },
            {
                id: uuid(),
                courseId: '2',
                name: 'Práctica calificada 1',
                courseName: 'Química',
                startDate: '2022-08-26',
                endDate: '2022-08-26',
                status: 3
            }
        ]
    }
}

export default new AssessmentsService();