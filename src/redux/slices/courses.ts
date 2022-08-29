import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Course} from "../../communication/types/responses/course";

type CourseFilter = {
    name: string;
    startDate: Date | null;
    endDate: Date | null;
};

type CoursesState = {
    filters: CourseFilter;
    isLoading: boolean;
    courses: Course[];
    error: string | null;
}

const initialState: CoursesState = {
    filters: {
        name: '',
        startDate: null,
        endDate: null
    },
    isLoading: false,
    courses: [],
    error: null
}

export const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        coursesLoaded: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        coursesLoading: (state) => {
            state.isLoading = true;
        },
        coursesFailed: (state, action: PayloadAction<string>) => {
            state.courses = [];
            state.isLoading = false;
            state.error = action.payload;
        },
        filtersUpdated: (state, action: PayloadAction<CourseFilter>) => {
            state.filters = action.payload;
        }
    }
});

export const { coursesLoaded, coursesLoading, coursesFailed, filtersUpdated } = coursesSlice.actions;

export default coursesSlice.reducer;
