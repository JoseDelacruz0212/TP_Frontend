import {Entity} from "./entity"
import {User} from "./user";
import {Course} from "./courses";

export interface UserCourse extends Entity{
    user: User;
    isDeleted: boolean;
    course: Course;
}
