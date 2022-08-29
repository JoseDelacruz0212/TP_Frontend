import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Course} from "../../communication/types/responses/course";

export type Pagination = {
    page: number;
    pageSize: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    lastPage: number;
};

export type CourseFilter = {
    name: string;
    startDate?: string;
    endDate?: string;
};

export type CoursesState = {
    filters: CourseFilter;
    pagination: Pagination;
    isLoading: boolean;
    courses: Course[];
    filteredCourses: Course[];
    error: string | null;
}

export const initialState: CoursesState = {
    filters: {
        name: '',
        startDate: undefined,
        endDate: undefined
    },
    pagination: {
        page: 1,
        pageSize: 10,
        totalItems: 0,
        hasNext: false,
        hasPrev: false,
        lastPage: 1
    },
    isLoading: false,
    courses: [],
    filteredCourses: [],
    error: null
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        coursesLoaded: (state, action: PayloadAction<Course[]>) => {
            state.courses = [...action.payload];
            state.filteredCourses = [...action.payload];
            state.isLoading = false;
            state.error = null;
        },
        coursesLoading: (state) => {
            state.isLoading = true;
        },
        coursesFailed: (state, action: PayloadAction<string>) => {
            state.courses = [];
            state.filteredCourses = [];
            state.isLoading = false;
            state.error = action.payload;
        },
        filteredCoursesUpdated: (state, action: PayloadAction<Course[]>) => {
            state.filteredCourses = [...action.payload];
        },
        filtersUpdated: (state, action: PayloadAction<CourseFilter>) => {
            state.filters = { ...action.payload };
        },
        paginationUpdate: (state, action: PayloadAction<Pagination>) => {
            state.pagination = { ...action.payload };
        }
    }
});

export const { coursesLoaded, coursesLoading, coursesFailed, filteredCoursesUpdated, filtersUpdated, paginationUpdate } = coursesSlice.actions;

export default coursesSlice.reducer;
