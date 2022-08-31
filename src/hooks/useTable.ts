import {useEffect, useState} from "react";

import {Column, Row, RowValue} from "../types/components/common/table/table";
import {Convertor} from "../types/hooks/table";
import {Entity} from "../types/communication/responses/entity";

const useTable = <T extends Entity>(convertor: Convertor<T>, columns: string[] = [], data: T[] = []) => {
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
        key: row.id,
        rowValues: columns.map((column): RowValue => ({
            key: column.key,
            value: convertor(column.key as number, row)
        }))
    }));

export default useTable;
