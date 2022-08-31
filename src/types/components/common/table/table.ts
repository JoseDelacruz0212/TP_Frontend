import React from "react";

import {FilterSchema} from "./filters";
import {Option} from "../options";

export type Column = {
    key: number | string;
    label: React.ReactNode;
}

export type RowValue = {
    key: number | string;
    value: React.ReactNode;
}

export type Row = {
    key: number | string;
    rowValues: RowValue[];
}

export type TableProps = {
    title: string;
    columns: Column[];
    rows: Row[];
    onPageChange: (direction: -2 | -1 | 1 | 2) => void;
    pageSizeOptions?: Option[];
    onPageSizeChanged: (pageSize: number) => void;
    filterSchemas: FilterSchema[];
    pageSize?: number;
    currentPage?: number;
    totalItems?: number;
    onClick?: (id: number | string) => void;
    onFiltersClosed?: () => void;
}
