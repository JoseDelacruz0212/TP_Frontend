import AssessmentService from "../../services/AssessmentService";

import {
    AssessmentFilter,
    assessmentsFailed,
    assessmentsLoaded,
    assessmentsLoading, filteredAssessmentsUpdated, filtersUpdated,
    initialState, Pagination, paginationUpdate
} from "../slices/assessments";

import {Assessment} from "../../communication/types/responses/assessment";

export const getAllAssessments = (courseId?: string) => async (dispatch: any) => {
    dispatch(assessmentsLoading());

    let assessments;

    try {
        assessments = await AssessmentService.getAssessments();
    } catch (error) {
        dispatch(assessmentsFailed((error as Error).message));
        return;
    }

    dispatch(assessmentsLoaded(assessments));

    let filters = { ...initialState.filters };

    if (courseId) {
        filters.courseId = courseId;
        dispatch(filtersUpdated(filters));
    }

    dispatch(filterData(assessments, filters, initialState.pagination));
};

export const updateFilters = (filters: AssessmentFilter) => async (dispatch: any, getState: any) => {
    const { assessments } = getState();
    dispatch(filtersUpdated(filters));
    dispatch(filterData(assessments.assessments, filters, initialState.pagination));
}

export const resetFilters = () => async (dispatch: any, getState: any) => {
    const { assessments } = getState();
    dispatch(filtersUpdated(initialState.filters));
    dispatch(filterData(assessments.assessments, initialState.filters, initialState.pagination));
}

export const updatePage = (option: number) => async (dispatch: any, getState: any) => {
    const { assessments } = getState();
    const pagination = { ...assessments.pagination };

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

    dispatch(filterData(assessments.courses, assessments.filters, pagination));
}

export const updatePageSize = (pageSize: number) =>  async (dispatch: any, getState: any) => {
    const { assessments } = getState();
    const pagination = { ...assessments.pagination };
    pagination.pageSize = pageSize;

    dispatch(filterData(assessments.courses, assessments.filters, pagination));
}

const filterData = (data: Assessment[], filters: AssessmentFilter, pagination: Pagination) =>
    async (dispatch: any, getState: any) => {
        const { paginated, newPagination } = getNewPagination(getFilteredData(data, filters), pagination);

        dispatch(paginationUpdate(newPagination));
        dispatch(filteredAssessmentsUpdated(paginated));
    };

const getFilteredData = (data: Assessment[], filters: AssessmentFilter) => {
    return data
        .filter((assessment: any) => !filters.name || assessment.name.toLowerCase().includes(filters.name.toLowerCase()))
        .filter((assessment: any) => !filters.courseId || assessment.courseId === filters.courseId)
        .filter((assessment: any) => !filters.startDate || new Date(filters.startDate) <= new Date(assessment.startDate))
        .filter((assessment: any) => !filters.endDate || new Date(filters.endDate) >= new Date(assessment.endDate));
}

const getNewPagination = (data: Assessment[], pagination: Pagination) => {
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
