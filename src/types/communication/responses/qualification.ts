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
    points: { points: number; transactionDate?: string }[];
    grade?: string;
    section?: string;
    isEdited?: boolean;
    json?: string;
    userFirstName?: string;
    userLastName?: string;
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
    transactionDate?: string;
    userFirstName?: string;
    userLastName?: string;
}

export const mapToQualificationGroup = (qualifications: Qualification[]): QualificationGroup[] => {
    const group: QualificationGroup[] = [];

    qualifications.forEach(qualification => {
        if (qualification.points) {
            let groupToAssign = group.find(x => x.evaluationId === qualification.evaluationId);

            if (!groupToAssign) {
                groupToAssign = {
                   ...qualification,
                   points: [{
                       points: qualification.points,
                       transactionDate: qualification.transactionDate
                   }]
                };

                group.push(groupToAssign);
            } else {
                groupToAssign.points = [...groupToAssign.points, {
                    points: qualification.points,
                    transactionDate: qualification.transactionDate
                }];
            }

            groupToAssign.points = groupToAssign.points.sort((a, b) => {
                if (!a.transactionDate || !b.transactionDate) return 1;

                const firstDate = new Date(a.transactionDate);
                const secondDate = new Date(b.transactionDate);

                return firstDate.getTime() > secondDate.getTime() ? -1 : 1;
            });
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
    json: qualification.json,
    userFirstName: qualification.user.name,
    userLastName: qualification.user.lastName
})
