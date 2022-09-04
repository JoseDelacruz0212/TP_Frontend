import {Entity} from "./entity";
import {Course} from "./courses";

export interface Assessment extends Entity {
    name: string;
    availableOn: string;
    status: number;
    duration?: number;
    numberQuestions?: number;
    courseId?: string;
    courses?: Course;
}

export interface AssessmentCreated {
    newEvaluation: Assessment;
};
