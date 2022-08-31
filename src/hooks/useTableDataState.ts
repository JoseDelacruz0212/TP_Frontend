import {useEffect} from "react";

import {useAppDispatch} from "../redux/store";
import {useSliceActions, useSliceSelector} from "../redux/providers/SliceProvider";

import useTable from "./useTable";

import {Convertor} from "../types/hooks/table";
import {Entity} from "../types/communication/responses/entity";
import {Service} from "../types/communication/service";
import {Filter} from "../types/communication/requests/filter";

const useTableDataState = <T>(convertor: Convertor<Entity>, columns: string[] = [], service: Service) => {
    const dispatch = useAppDispatch();
    const { dataRequestStarted, dataFetchingFailed, dataLoaded, filtersUpdated, pageUpdated, pageSizeUpdated } = useSliceActions();
    const { items, filters, paginationOptions } = useSliceSelector();
    const { tableColumns, tableData } = useTable(convertor, columns, items?.data);

    const getData = async () => {
        if (!filters) return;

        dispatch(dataRequestStarted(null));

        service.getData(filters, paginationOptions?.page, paginationOptions?.pageSize).then(
            (response) => dispatch(dataLoaded(response)),
            (error) => dispatch(dataFetchingFailed(error.message))
        );
    };

    useEffect(() => {
        getData().then();
    }, [filters, paginationOptions]);

    const onFiltersUpdate = (filters: Filter) => dispatch(filtersUpdated(filters));
    const onPageUpdate = (page?: number) => dispatch(pageUpdated(page));
    const onPageSizeUpdate = (pageSize?: number) => dispatch(pageSizeUpdated(pageSize));

    return {
        tableColumns,
        tableData,
        filters: filters as T,
        pagination: items?.pagination,
        page: paginationOptions?.page,
        pageSize: paginationOptions?.pageSize,
        onFiltersUpdate,
        onPageUpdate,
        onPageSizeUpdate
    }
};

export default useTableDataState;
