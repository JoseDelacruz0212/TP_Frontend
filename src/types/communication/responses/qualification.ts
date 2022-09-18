import { Entity } from "./entity";
import {User} from "./user";
import {Assessment} from "./assessment";

export interface Qualification extends Entity {
    user: User;
    evaluation: Assessment;
    json: string;
    points: number;
}
