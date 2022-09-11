import {Filter} from "./filter";

export interface InstitutionFilter extends Filter {
    name: string;
    direction: string;
    code: string;
}
