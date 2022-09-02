import {Entity} from "./entity";

export interface Institution extends Entity {
    name: string;
    direction: string;
    code: string;
};

export interface InstitutionCreated {
    newInstitution: Institution;
}
