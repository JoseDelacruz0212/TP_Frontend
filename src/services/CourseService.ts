import {Course} from "../communication/types/responses/course";

class CourseService {
    async getCourses(): Promise<Course[]> {
        return [
            {
                id: "1",
                name: 'Matemática',
                startDate: new Date(2022, 4, 20),
                endDate: new Date(2022, 4, 26)
            },
            {
                id: "2",
                name: 'Química',
                startDate: new Date(2022, 5, 20),
                endDate: new Date(2022, 5, 26)
            }
        ]
    }
}

export default new CourseService();