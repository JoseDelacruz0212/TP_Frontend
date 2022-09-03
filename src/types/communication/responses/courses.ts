import { Entity } from "./entity";
import {Institution} from "./institutions";

export interface Course extends Entity {
    name: string;
    description: string;
    institutionId?: string;
    institution?: Institution;
}

export interface InstitutionOption {
    id: string;
    name: string;
}
