import {Filter} from "./filter";

export interface CourseFilter extends Filter {
    name: string;
    startDate?: string;
    endDate?: string;
};
