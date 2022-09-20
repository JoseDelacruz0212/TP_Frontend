import { Entity } from "./entity";
import {User} from "./user";
import {Assessment} from "./assessment";

export interface APIQualification extends Entity {
    user: User;
    evaluation: Assessment;
    points: number;
    json?: string;
}

export interface QualificationGroup extends Entity {
    userId?: string;
    courseName?: string;
    courseId?: string;
    evaluationStatus?: number;
    evaluationName?: string;
    evaluationId?: string;
    institutionName?: string;
    institutionId?: string;
    availableOn?: string;
    points: number[];
    grade?: string;
    section?: string;
    isEdited?: boolean;
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
    points?: number;
    grade?: string;
    section?: string;
    isEdited?: boolean;
    json?: string;
}

export const mapToQualificationGroup = (qualifications: Qualification[]): QualificationGroup[] => {
    const group: QualificationGroup[] = [];

    qualifications.forEach(qualification => {
       const groupToAssign = group.find(x => x.evaluationId === qualification.evaluationId);

       if (qualification.points) {
           if (groupToAssign)
               groupToAssign.points = [...groupToAssign.points, qualification.points];
           else
               group.push({...qualification, points: [qualification.points]});
       }
    });

    return group;
}

export const createFrom = (qualification: APIQualification): Qualification => ({
    id: qualification.id,
    userId: qualification.user.idUser,
    courseName: qualification.evaluation.courses?.name,
    courseId: qualification.evaluation.courseId,
    evaluationStatus: qualification.evaluation.status,
    evaluationName: qualification.evaluation.name,
    evaluationId: qualification.evaluation.id,
    institutionName: qualification.user.institution?.name,
    institutionId: qualification.user.institution?.id,
    availableOn: qualification.evaluation.availableOn,
    points: qualification.points,
    grade: qualification.evaluation.courses?.grade,
    section: qualification.evaluation.courses?.section,
    json: qualification.json
})
