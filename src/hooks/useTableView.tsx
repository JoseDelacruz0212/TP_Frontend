import React, {useCallback, useEffect, useState} from "react";

import {useAppDispatch} from "../redux/store";
import {useSliceActions, useSliceSelector} from "../redux/providers/SliceProvider";

import useTable from "./useTable";

import {CrudService} from "../services/CrudService";
import {Entity} from "../types/communication/responses/entity";
import {Filter} from "../types/communication/requests/filter";
import {ConvertorCreator, FilterSchemaCreator, Service} from "../types/common";
import {toast} from "react-toastify";
import ConfirmationToast from "../components/common/confirmation-toast/ConfirmationToast";

const useTableView = <T extends Entity, F extends Filter>(columns: React.ReactNode[] = [], service: Service<T, F>, defaultItemSchema: T, filterSchemaCreator: FilterSchemaCreator<F>, convertorCreator: ConvertorCreator<T>, defaultFilters?: object) => {
    const toastId = React.useRef<any>(null);

    const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
    const [item, setItem] = useState<T>(defaultItemSchema);

    const dispatch = useAppDispatch();
    const { dataRequestStarted, dataFetchingFailed, dataLoaded, filtersUpdated, pageUpdated, pageSizeUpdated, dataItemDeleted, dataItemUpdated, reset, panelRequestStarted, panelRequestSucceeded, panelRequestFailed } = useSliceActions();
    const { items, isLoading, filters, paginationOptions, initialFiltersApplied, showPanelLoadingIndicator } = useSliceSelector();

    const getData = () => {
        if (!filters) return;

        dispatch(dataRequestStarted(null));

        service.getData(filters as F, paginationOptions?.page, paginationOptions?.pageSize)
            .then(response => dispatch(dataLoaded(response)))
            .catch(error => {
                dispatch(dataFetchingFailed(null));
                toast.error(error)
            })
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
            getData();
        }
    }, [filters, paginationOptions]);

    const onSaveItem = () => {
        if (!(service instanceof CrudService<T, F>)) return;

        dispatch(panelRequestStarted(null));

        service.saveItem(item)
            .then(message => {
                dispatch(panelRequestSucceeded(null));
                dispatch(dataItemUpdated(item));
                onEditPanelClose();

                toast.success(message)
            })
            .catch(error => {
                dispatch(panelRequestFailed(null));
                onEditPanelClose();

                toast.error(error)
            });
    };

    const onEditItem = (item: T) => {
        setIsEditPanelOpen(true);
        setItem(item);
    };

    const showDeletionConfirmation = (id?: string) => {
        toastId.current = toast(<ConfirmationToast text="¿Desea eliminar este elemento de la lista?"
                                                   onSend={() => {
                                                       toast.dismiss(toastId.current);
                                                       onDeleteItem(id);
                                                   }}
                                                   onClose={() => toast.dismiss(toastId.current)}/>, {
            closeButton: true,
            autoClose: false,
            closeOnClick: false,
            progress: 100
        })
    }

    const onDeleteItem = (id?: string) => {
        if (!(service instanceof CrudService<T, F>) || !id) return;

        dispatch(panelRequestStarted(null));
        const toastMessage = toast.loading("Se está procesado la petición, por favor espere");

        service.deleteItem(id)
            .then(message => {
                dispatch(panelRequestSucceeded(null));
                dispatch(dataItemDeleted(id));

                toast.update(toastMessage, { render: message, type: 'success', isLoading: false, autoClose: 5000, closeButton: true });
            })
            .catch(error => {
                dispatch(panelRequestFailed(null));
                onEditPanelClose();

                toast.update(toastMessage, { render: error, type: 'error', isLoading: false, autoClose: 5000, closeButton: true });
            });
    }

    const onEditPanelClose = () => {
        setIsEditPanelOpen(false);
        setItem(defaultItemSchema);
    };

    const onEditPanelOpen = () => setIsEditPanelOpen(true);

    const onPageUpdate = (page?: number) => dispatch(pageUpdated(page));
    const onPageSizeUpdate = (pageSize?: number) => dispatch(pageSizeUpdated(pageSize));

    const onItemUpdate = (item: T) => setItem(item);

    const filterSchemas = filterSchemaCreator(filters as F, (filters) => dispatch(filtersUpdated(filters)));
    const convertor = useCallback(convertorCreator(onEditItem, showDeletionConfirmation), [convertorCreator]);

    const { tableColumns, tableData } = useTable(convertor, columns, items?.data as T[]);

    return {
        tableColumns,
        tableData,
        isLoading,
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
        onItemUpdate,
        showPanelLoadingIndicator
    }
};

export default useTableView;
