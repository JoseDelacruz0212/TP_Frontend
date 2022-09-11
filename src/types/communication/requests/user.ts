import {Filter} from "./filter";

export interface UserFilter extends Filter {
    name: string;
    lastName: string;
    email: string;
    institution: string;
    courseId: string;
}
