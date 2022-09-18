import {Filter} from "./filter";

export interface QualificationFilter extends Filter {
    assessmentId: string;
    userId: string;
}
