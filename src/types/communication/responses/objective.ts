import {Entity} from "./entity";

export interface Objective extends Entity {
    name: string;
    description: string;
    courseId?: string;
}
