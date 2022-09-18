import { Entity } from "./entity";
import {User} from "./user";
import {Assessment} from "./assessment";

export interface APIQualification extends Entity {
    user: User;
    evaluation: Assessment;
    points: number;
    json?: string;
}

export interface Qualification extends Entity {
    userId?: string;
    courseName?: string;
    courseId?: string;
    evaluationStatus?: number;
    evaluationName?: string;
    evaluationId?: string;
    institutionName?: string;
    institutionId?: string;
    availableOn?: string;
    nota?: number;
    grade?: string;
    section?: string;
    isEdited?: boolean;
    json?: string;
}

export const createFrom = (qualification: APIQualification): Qualification => {
    return {
        userId: qualification.user.idUser,
        courseName: qualification.evaluation.courses?.name,
        courseId: qualification.evaluation.courseId,
        evaluationStatus: qualification.evaluation.status,
        evaluationName: qualification.evaluation.name,
        evaluationId: qualification.evaluation.id,
        institutionName: qualification.user.institution?.name,
        institutionId: qualification.user.institution?.id,
        availableOn: qualification.evaluation.availableOn,
        nota: qualification.points,
        grade: qualification.evaluation.courses?.grade,
        section: qualification.evaluation.courses?.section
    }
}
