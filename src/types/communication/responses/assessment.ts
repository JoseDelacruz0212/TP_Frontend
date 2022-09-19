import {Entity} from "./entity";
import {Course} from "./courses";
import {APIQualification} from "./qualification";

export interface Assessment extends Entity {
    name: string;
    availableOn: string;
    status: number;
    json: string;
    duration?: number;
    numberQuestions?: number;
    courseId?: string;
    courses?: Course;
    flag?: boolean;
}

export const createFrom = (qualification: APIQualification): Assessment => {
    return {
        id: qualification.evaluation.id,
        name: qualification.evaluation.name,
        availableOn: qualification.evaluation.availableOn,
        status: qualification.evaluation.status,
        json: qualification.json || '',
        duration: qualification.evaluation.duration,
        numberQuestions: qualification.evaluation.numberQuestions,
        courseId: qualification.evaluation.courseId,
        courses: qualification.evaluation.courses
    }
}

export interface AssessmentCreated {
    newEvaluation: Assessment;
};
