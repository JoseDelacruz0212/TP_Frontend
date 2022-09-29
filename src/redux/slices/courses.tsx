import createTableDataSlice, {TableDataState} from "./tableData";

import {CourseFilter} from "../../types/communication/requests/course";
import {Course} from "../../types/communication/responses/courses";

const initialState: TableDataState<Course, CourseFilter> = {
    filters: {
        name: '',
        institution: '',
        code: '',
        grade: '',
        section: ''
    }
};

export const coursesSlice = createTableDataSlice<Course, CourseFilter>({
    name: 'courses',
    initialState
})

export default coursesSlice.reducer;
