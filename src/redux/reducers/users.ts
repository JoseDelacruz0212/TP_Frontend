import {PayloadAction} from "@reduxjs/toolkit";

import {TableDataState} from "../../types/store/states";
import {PaginatedResponse} from "../../types/communication/responses/pagination";
import {User} from "../../types/communication/responses/user";
import {UserFilter} from "../../types/communication/requests/user";

export const userStatusChanged = (state: TableDataState<User, UserFilter>, action: PayloadAction<PaginatedResponse<User>>): TableDataState<User, UserFilter> => ({
    ...state,
    paginationOptions: {
        ...state.paginationOptions,
        page: 1
    }
});