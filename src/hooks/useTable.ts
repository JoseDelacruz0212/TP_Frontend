import {useEffect, useState} from "react";

import {Entity} from "../types/communication/responses/entity";
import {Column, Convertor, Row, RowValue} from "../types/common";

const useTable = <T extends Entity>(convertor: Convertor<T>, columns: string[] = [], data: T[]) => {
    const [tableColumns, setTableColumns] = useState(convertToTableColumns(columns));
    const [tableData, setTableData] = useState(convertData(data, tableColumns, convertor));

    useEffect(() => {
        const newTableColumns = convertToTableColumns(columns);

        setTableColumns(newTableColumns);
        setTableData(convertData(data, tableColumns, convertor));
    }, [columns, convertor, data]);

    return { tableColumns, tableData };
}

const convertToTableColumns = (columns: string[] = []): Column[] =>
    columns.map((column, index) => ({ key: index + 1, label: column }));

const convertData = <T extends Entity>(data: T[] = [], columns: Column[] = [], convertor: Convertor<T>): Row[] =>
    data.map((row, index): Row => ({
        key: row.id as string,
        rowValues: columns.map((column): RowValue => ({
            key: column.key,
            value: convertor(column.key as number, row)
        }))
    }));

export default useTable;
