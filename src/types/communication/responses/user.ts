import {Entity} from "./entity";
import {Institution} from "./institutions";

export interface User extends Entity {
    name: string;
    lastName: string;
    email: string;
    roles?: string[];
    password?: string;
    status?: boolean;
    insitutionId?: string;
    institution?: Institution;
    idUser?: string;
};
