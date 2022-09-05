import React from "react";

import {Entity} from "../communication/responses/entity";
import {FilterSchema} from "../components/common/table/filters";

export type Convertor<T extends Entity> = (columnKeys: number, x: T) => React.ReactNode;
export type FilterSchemaCreator<T> = (filters: T, onFiltersUpdate: (filters: T) => any) => FilterSchema[];
export type ConvertorCreator<T> = (onEdit: (x: T) => void, onDelete: (x: string) => void) => Convertor<T>;
export type MenuOptionsCreator<T> = (onEdit: (x: T) => void, onDelete: (x: string) => void, rowData: T) => React.ReactElement[];
