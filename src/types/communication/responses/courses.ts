import { Entity } from "./entity";

export interface Course extends Entity {
    name: string;
    description: string;
    institutionId?: string;
}

export interface InstitutionOption {
    id: string;
    name: string;
}
