import React from "react";

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

