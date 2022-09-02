import { Entity } from "./entity";

export interface Course extends Entity {
    name: string;
    description: string;
    institution: string;
}