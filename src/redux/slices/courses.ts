import createTableDataSlice from "./tableData";

import {Course} from "../../types/communication/responses/course";
import {CourseFilter} from "../../types/communication/requests/course";
import {TableDataState} from "../../types/store/states";

const initialState: TableDataState<Course, CourseFilter> = {
    filters: {
        name: '',
        startDate: undefined,
        endDate: undefined
    }
};

export const coursesSlice = createTableDataSlice<Course, CourseFilter>({
    name: 'courses',
    initialState
});

export default coursesSlice.reducer;
