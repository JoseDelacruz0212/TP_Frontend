export type Filter = { };

export interface CourseFilter extends Filter {
    name: string;
    startDate?: string;
    endDate?: string;
};
