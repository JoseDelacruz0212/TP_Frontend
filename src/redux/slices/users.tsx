import createTableDataSlice from "./tableData";

import {TableDataState} from "../../types/store/states";
import {User} from "../../types/communication/responses/user";
import {UserFilter} from "../../types/communication/requests/user";
import {userStatusChanged} from "../reducers/users";

const initialState: TableDataState<User, UserFilter> = {
    filters: {
        name: '',
        lastName: '',
        email: '',
        institution: ''
    }
};

export const usersSlice = createTableDataSlice<User, UserFilter>({
    name: 'users',
    initialState,
    reducers: {
        userStatusChanged
    }
})

export default usersSlice.reducer;
