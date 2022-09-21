import {Entity} from "./entity";
import {Institution} from "./institutions";

export interface User extends Entity {
    name: string;
    lastName: string;
    email: string;
    roles?: string[];
    role?: string;
    password?: string;
    status?: boolean;
    insitutionId?: string;
    institution?: Institution;
    idUser?: string;
    avatarUrl?: string;
};

export interface Profile {
    message: string;
    user: User;
}
