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

    return (
        <div>
            <Table title={title}
                   columns={tableData.tableColumns}
                   rows={tableData.tableData}
                   onPageChange={(option) => tableData.onPageUpdate(option)}
                   onPageSizeChanged={(pageSize) => tableData.onPageSizeUpdate(pageSize)}
                   onFiltersClosed={() => {}}
                   filterSchemas={filterSchemas}
                   pageSize={tableData.pageSize}
                   currentPage={tableData.page}
                   totalItems={tableData.tableData?.length} />
        </div>
    );
};

export default TableView;
