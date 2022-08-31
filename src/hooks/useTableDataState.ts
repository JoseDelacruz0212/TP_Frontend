import {useAppDispatch} from "../redux/store";
import {useSliceActions, useSliceSelector} from "../redux/providers/SliceProvider";

import useTable from "./useTable";

import {Convertor} from "../types/hooks/table";
import {Entity} from "../types/communication/responses/entity";
import {Service} from "../types/communication/service";
import {useEffect} from "react";
import {Filter} from "../types/communication/requests/course";

const useTableDataState = <T>(convertor: Convertor<Entity>, columns: string[] = [], service: Service) => {
    const dispatch = useAppDispatch();
    const { dataRequestStarted, dataFetchingFailed, dataLoaded, filtersUpdated, pageUpdated, pageSizeUpdated } = useSliceActions();
    const { items, filters, page, pageSize } = useSliceSelector();
    const { tableColumns, tableData } = useTable(convertor, columns, items?.data);

    const getData = async () => {
        if (!filters) return;

        dispatch(dataRequestStarted(null));

        service.getData(filters, page, pageSize).then(
            (response) => dispatch(dataLoaded(response)),
            (error) => dispatch(dataFetchingFailed(error.message))
        );
    };

    useEffect(() => {
        getData().then();
    }, [filters, page, pageSize]);

    const onFiltersUpdate = (filters: Filter) => dispatch(filtersUpdated(filters));
    const onPageUpdate = (filters: Filter) => dispatch(pageUpdated(filters));
    const onPageSizeUpdate = (filters: Filter) => dispatch(pageSizeUpdated(filters));

    return {
        tableColumns,
        tableData,
        filters: filters as T,
        page,
        pageSize,
        onFiltersUpdate,
        onPageUpdate,
        onPageSizeUpdate
    }
};

export default useTableDataState;
