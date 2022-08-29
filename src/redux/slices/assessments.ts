import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {Assessment} from "../../communication/types/responses/assessment";
import {CourseOption} from "../../communication/types/responses/course";

export type Pagination = {
    page: number;
    pageSize: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
    lastPage: number;
};

export type AssessmentFilter = {
    name: string;
    courseId: string;
    startDate?: string;
    endDate?: string;
};

export type AssessmentsState = {
    filters: AssessmentFilter;
    pagination: Pagination;
    isLoading: boolean;
    assessments: Assessment[];
    filteredAssessments: Assessment[];
    error: string | null;
    courseOptions: CourseOption[];
    isFilterActivated: boolean;
}

export const initialState: AssessmentsState = {
    filters: {
        name: '',
        courseId: '',
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
    assessments: [],
    filteredAssessments: [],
    error: null,
    courseOptions: [],
    isFilterActivated: false
}

export const assessmentsSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        assessmentsLoaded: (state, action: PayloadAction<Assessment[]>) => {
            state.assessments = [...action.payload];
            state.filteredAssessments = [...action.payload];
            state.isLoading = false;
            state.error = null;
        },
        assessmentsLoading: (state) => {
            state.isLoading = true;
        },
        courseOptionsLoaded: (state, action: PayloadAction<CourseOption[]>) => {
            state.courseOptions = [...action.payload]
        },
        assessmentsFailed: (state, action: PayloadAction<string>) => {
            state.assessments = [];
            state.filteredAssessments = [];
            state.isLoading = false;
            state.error = action.payload;
        },
        filteredAssessmentsUpdated: (state, action: PayloadAction<Assessment[]>) => {
            state.filteredAssessments = [...action.payload];
        },
        filtersUpdated: (state, action: PayloadAction<AssessmentFilter>) => {
            state.filters = { ...action.payload };
        },
        paginationUpdate: (state, action: PayloadAction<Pagination>) => {
            state.pagination = { ...action.payload };
        }
    }
});

export const { assessmentsLoaded, assessmentsLoading, courseOptionsLoaded, assessmentsFailed, filteredAssessmentsUpdated, filtersUpdated, paginationUpdate } = assessmentsSlice.actions;

export default assessmentsSlice.reducer;
