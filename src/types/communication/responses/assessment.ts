import {Entity} from "./entity";

export interface Assessment extends Entity {
    name: string;
    courseId: string;
    courseName: string;
    startDate: string;
    endDate: string;
    status: number;
};
