import { Entity } from "./entity";

export default interface ICourses extends Entity{
    name: string;
    description: string;
    institution: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string; 
    updatedBy: string; 
}