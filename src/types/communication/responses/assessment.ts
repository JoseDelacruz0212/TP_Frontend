import {Entity} from "./entity";

export interface Assessment extends Entity {
    name: string;
    availableOn: string;
    duration?: number;
    numberQuestions?: number;
    courseId?: string;
}
