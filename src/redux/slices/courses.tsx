import ICourses from "../../types/communication/responses/courses";
import {TableDataState} from "../../types/store/states";
import {CourseFilter} from "../../types/communication/requests/course";
import createTableDataSlice from "./tableData";

const initialState: TableDataState<ICourses, CourseFilter> = {
    filters: {
        name: '',
        institution: ''
    }
};

export const coursesSlice = createTableDataSlice<ICourses, CourseFilter>({
    name: 'courses',
    initialState
})

export default coursesSlice.reducer;
