import React, {useCallback, useEffect, useState} from "react";

import {useAppDispatch} from "../redux/store";
import {useSliceActions, useSliceSelector} from "../redux/providers/SliceProvider";

import useTable from "./useTable";

import {CrudService} from "../services/CrudService";
import {Entity} from "../types/communication/responses/entity";
import {Filter} from "../types/communication/requests/filter";
import {ConvertorCreator, FilterSchemaCreator} from "../types/common";
import {toast} from "react-toastify";

const useTableView = <T extends Entity, F extends Filter>(columns: React.ReactNode[] = [], service: CrudService<T, F>, defaultItemSchema: T, filterSchemaCreator: FilterSchemaCreator<F>, convertorCreator: ConvertorCreator<T>, defaultFilters?: object) => {
    const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
    const [item, setItem] = useState<T>(defaultItemSchema);

    const dispatch = useAppDispatch();
    const { dataRequestStarted, dataFetchingFailed, dataLoaded, filtersUpdated, pageUpdated, pageSizeUpdated, dataItemDeleted, dataItemUpdated, reset } = useSliceActions();
    const { items, filters, paginationOptions, initialFiltersApplied } = useSliceSelector();

    const getData = async () => {
        if (!filters) return;

        dispatch(dataRequestStarted(null));

        service.getData(filters as F, paginationOptions?.page, paginationOptions?.pageSize).then(
            response => dispatch(dataLoaded(response)),
        );
    };

    useEffect(() => {
        if (defaultFilters) {
            dispatch(filtersUpdated({...filters, ...defaultFilters}));
        }

        return () => {
            dispatch(reset(null));
        }
    }, [defaultFilters]);

    useEffect(() => {
        if (!defaultFilters || initialFiltersApplied) {
            getData().then();
        }
    }, [filters, paginationOptions]);

    const onSaveItem = () => {
        service.saveItem(item).then(
            () => {
                dispatch(dataItemUpdated(item));
                onEditPanelClose();

                toast.success("La acción se realizó exitosamente")
            }
        );
    };

    const onEditItem = (item: T) => {
        setIsEditPanelOpen(true);
        setItem(item);
    };

    const onDeleteItem = (id?: string) =>
        id && service.deleteItem(id).then(() => {
            dispatch(dataItemDeleted(id));
            toast.success("El registro se eliminó exitosamente");
        });

    const onEditPanelClose = () => {
        setIsEditPanelOpen(false);
        setItem(defaultItemSchema);
    };

    const onEditPanelOpen = () => setIsEditPanelOpen(true);

    const onPageUpdate = (page?: number) => dispatch(pageUpdated(page));
    const onPageSizeUpdate = (pageSize?: number) => dispatch(pageSizeUpdated(pageSize));

    const onItemUpdate = (item: T) => setItem(item);

    const filterSchemas = filterSchemaCreator(filters as F, (filters) => dispatch(filtersUpdated(filters)));
    const convertor = useCallback(convertorCreator(onEditItem, onDeleteItem), [convertorCreator]);

    const { tableColumns, tableData } = useTable(convertor, columns, items?.data as T[]);

    return {
        tableColumns,
        tableData,
        filters: filters as F,
        pagination: items?.pagination,
        page: paginationOptions?.page,
        pageSize: paginationOptions?.pageSize,
        filterSchemas,
        onPageUpdate,
        onPageSizeUpdate,
        onSaveItem,
        onEditPanelClose,
        onEditPanelOpen,
        isEditPanelOpen,
        item,
        onItemUpdate
    }
};

export default useTableView;