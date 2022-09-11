import {Filter} from "./filter";

export interface AssessmentFilter extends Filter {
    name: string;
    courseId: string;
}
