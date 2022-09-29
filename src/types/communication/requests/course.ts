import {Filter} from "./filter";

export interface CourseFilter extends Filter {
    name: string;
    institution: string;
    code: string;
    grade: string;
    section: string;
}
