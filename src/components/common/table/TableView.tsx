import React from "react";

import {Entity} from "../../../types/communication/responses/entity";
import {FilterSchema} from "../../../types/components/common/table/filters";
import {Convertor} from "../../../types/hooks/table";
import {Service} from "../../../types/communication/service";

import useTableDataState from "../../../hooks/useTableDataState";

import Table from "./Table";

export type TableViewProps<T extends Entity, F> = {
    title: string;
    createFilterSchema: (filters: F, onFiltersUpdate: (filters: F) => any) => FilterSchema[];
    columns: string[];
    convertor: Convertor<T>,
    service: Service
}

const TableView = <T extends Entity, F>({ title, createFilterSchema, columns, convertor, service }: TableViewProps<T, F>) => {
    const tableData = useTableDataState<F>(convertor as Convertor<Entity>, columns, service);
    const filterSchemas = createFilterSchema(tableData.filters, tableData.onFiltersUpdate);

    const getNewPage = (option: number) => {
        if (!tableData.pagination) return undefined;

        if (Math.abs(option) === 2) {
            if (option < 0) return 1;
            return tableData.pagination.lastPage
        } else {
            return tableData.pagination.page + option;
        }
    };

    return (
        <div>
            <Table title={title}
                   columns  ={tableData.tableColumns}
                   rows={tableData.tableData}
                   onPageChange={(option) => tableData.onPageUpdate(getNewPage(option))}
                   onPageSizeChanged={(pageSize) => tableData.onPageSizeUpdate(pageSize)}
                   onFiltersClosed={() => {}}
                   filterSchemas={filterSchemas}
                   hasNext={tableData.pagination?.hasNext}
                   hasPrev={tableData.pagination?.hasPrev}
                   pageSize={tableData.pagination?.pageSize}
                   currentPage={tableData.pagination?.page}
                   totalItems={tableData.pagination?.totalItems} />
        </div>
    );
};

export default TableView;
