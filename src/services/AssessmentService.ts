import {Assessment} from "../communication/types/responses/assessment";
import { v4 as uuid } from 'uuid';

class AssessmentsService {
    async getAssessments(): Promise<Assessment[]> {
        return [
            {
                id: uuid(),
                name: 'Práctica calificada 1',
                courseId: '6f43976a-48ef-4210-a869-8227aa2ea802',
                courseName: 'Matemática',
                startDate: '2022-08-26',
                endDate: '2022-08-26',
                status: 1
            },
            {
                id: uuid(),
                courseId: '6f43976a-48ef-4210-a869-8227aa2ea802',
                name: 'Práctica calificada 2',
                courseName: 'Matemática',
                startDate: '2022-08-26',
                endDate: '2022-08-26',
                status: 2
            },
            {
                id: uuid(),
                courseId: '',
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