import CourseService from "../../services/CourseService";
import {
    coursesLoaded,
    coursesLoading,
    coursesFailed,
    CourseFilter,
    filtersUpdated,
    filteredCoursesUpdated, paginationUpdate, Pagination, initialState
} from "../slices/courses";

import {Course} from "../../communication/types/responses/course";

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
    dispatch(filterData(courses, initialState.filters, initialState.pagination));
};

export const updateFilters = (filters: CourseFilter) => async (dispatch: any, getState: any) => {
    const { courses } = getState();
    dispatch(filtersUpdated(filters));
    dispatch(filterData(courses.courses, filters, initialState.pagination));
}

export const resetFilters = () => async (dispatch: any, getState: any) => {
    const { courses } = getState();
    dispatch(filtersUpdated(initialState.filters));
    dispatch(filterData(courses.courses, initialState.filters, initialState.pagination));
}

export const updatePage = (option: number) => async (dispatch: any, getState: any) => {
    const { courses } = getState();
    const pagination = { ...courses.pagination };

    switch (option) {
        case -2:
            pagination.page = 1;
            break;
        case -1:
            if (pagination.hasPrev) pagination.page -= 1;
            break;
        case 1:
            if (pagination.hasNext) pagination.page += 1;
            break;
        case 2:
            pagination.page = pagination.lastPage;
            break;
    }

    dispatch(filterData(courses.courses, courses.filters, pagination));
}

export const updatePageSize = (pageSize: number) =>  async (dispatch: any, getState: any) => {
    const { courses } = getState();
    const pagination = { ...courses.pagination };
    pagination.pageSize = pageSize;

    dispatch(filterData(courses.courses, courses.filters, pagination));
}

const filterData = (data: Course[], filters: CourseFilter, pagination: Pagination) =>
    async (dispatch: any, getState: any) => {
        const { paginated, newPagination } = getNewPagination(getFilteredData(data, filters), pagination);

        dispatch(paginationUpdate(newPagination));
        dispatch(filteredCoursesUpdated(paginated));
    };

const getFilteredData = (data: Course[], filters: CourseFilter) => {
    return data
        .filter((course: any) => !filters.name || course.name.toLowerCase().includes(filters.name.toLowerCase()))
        .filter((course: any) => !filters.startDate || new Date(filters.startDate) <= new Date(course.startDate))
        .filter((course: any) => !filters.endDate || new Date(filters.endDate) >= new Date(course.endDate));
}

const getNewPagination = (data: Course[], pagination: Pagination) => {
    const newPagination = { ...pagination };

    newPagination.lastPage = Math.ceil(data.length / newPagination.pageSize)
    newPagination.totalItems = data.length;
    newPagination.hasNext = newPagination.page < newPagination.lastPage;
    newPagination.hasPrev = newPagination.page > 1;

    const startIndex = newPagination.pageSize * (newPagination.page - 1);
    const endIndex = startIndex + newPagination.pageSize;

    const paginated = data.slice(startIndex, endIndex);

    return { paginated, newPagination };
};
