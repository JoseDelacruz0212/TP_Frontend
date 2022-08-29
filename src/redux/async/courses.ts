import CourseService from "../../services/CourseService";
import {coursesLoaded, coursesLoading, coursesFailed} from "../slices/courses";

export const getAllCourses = () => async (dispatch: any) => {
    dispatch(coursesLoading());

    let courses;

    try {
        courses = await CourseService.getCourses();
    } catch (error) {
        dispatch(coursesFailed((error as Error).message));
        return;
    }

    dispatch(coursesLoaded(courses));
};