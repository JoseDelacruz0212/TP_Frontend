import { Entity } from "./entity";
import {Institution} from "./institutions";

export interface Course extends Entity {
    name: string;
    description: string;
    code: string;
    grade: string;
    section: string;
    institutionId: string;
    institution?: Institution;
}

export interface CourseOption {
    id: string;
    name: string;
}

export interface CourseCreated {
    course: Course;
}
