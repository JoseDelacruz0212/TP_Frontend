import {Entity} from "./entity";

export interface Course extends Entity {
    name: string;
    startDate: string;
    endDate: string;
};

export interface CourseOption {
    key: string;
    value: string;
};
