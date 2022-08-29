import React from "react";
import {useEffect, useState} from "react";

import {Column, Row, RowValue} from "../components/common/table/Table";

export type Convertor<T> = (columnKeys: number, x: T) => React.ReactNode;

const useTable = <T extends { id: string }>(convertor: Convertor<T>, columns: string[] = [], data: T[] = []) => {
    const [tableColumns, setTableColumns] = useState(convertToTableColumns(columns));
    const [tableData, setTableData] = useState(convertData(data, tableColumns, convertor));

    useEffect(() => {
        const newTableColumns = convertToTableColumns(columns);

        setTableColumns(newTableColumns);
        setTableData(convertData(data, newTableColumns, convertor));
    }, [columns, data, convertor]);

    return { tableColumns, tableData };
}

const convertToTableColumns = (columns: string[] = []): Column[] =>
    columns.length === 0 ? [] : columns.map((column, index) => ({ key: index + 1, label: column }));

const convertData = <T extends { id: string }>(data: T[] = [], columns: Column[] = [], convertor: Convertor<T>): Row[] =>
    data.map((row, index): Row => ({
        key: row.id,
        rowValues: columns.map((column): RowValue => ({
            key: column.key,
            value: convertor(column.key as number, row)
        }))
    }));

export default useTable;
