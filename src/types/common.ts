import {Entity} from "./communication/responses/entity";
import React, {ReactElement} from "react";
import {IconType} from "react-icons";
import {CrudService} from "../services/CrudService";
import {FetchService} from "../services/FetchService";
import {SchemaOf} from "yup";

export interface Option {
    value: string;
    label: string;
}

export interface FormInputProps<T extends Entity, K = {}> {
    values: T;
    onChange?: (x: T) => void;
    validationSchema?: SchemaOf<T>;
    isValid?: boolean;
    errors?: K
}

export interface FilterSchema {
    id: string;
    type: React.ComponentType<FilterProps>;
    maxLength?: number;
    options?: Option[];
    startDate?: string;
    endDate?: string;
    onChange: (value: string) => void;
    withLabel?: boolean;
    placeholder?: string;
    label?: string;
    initialValue?: string;
    withTime?: boolean;
}

export interface FilterProps {
    schema: FilterSchema;
    onChange: (value: string) => void;
}

export interface Column {
    key: number | string;
    label: React.ReactNode;
}

export interface RowValue {
    key: number | string;
    value: React.ReactNode;
}

export interface Row {
    key: number | string;
    rowValues: RowValue[];
}

export interface NavMenuItem {
    key: number;
    label: string;
    icon?: ReactElement<IconType>;
    order: number;
    link?: string;
    permission?: string;
    type: string;
    title?: string;
}

export type Convertor<T extends Entity> = (columnKeys: number, x: T) => React.ReactNode;
export type FilterSchemaCreator<T> = (filters: T, onFiltersUpdate: (filters: T) => any) => FilterSchema[];
export type ConvertorCreator<T> = (onEdit: (x: T) => void, onDelete: (x: string) => void) => Convertor<T>;
export type MenuOptionsCreator<T> = (onEdit: (x: T) => void, onDelete: (x: string) => void, rowData: T) => React.ReactElement[];
export type Service<T, F> = CrudService<T, F> | FetchService<T, F>;
