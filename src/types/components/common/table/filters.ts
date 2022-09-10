import React from "react";
import {Option} from "../options";

export type FilterSchema = {
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
    initialValue?: number | string;
    withTime?: boolean;
}

export type FilterProps = {
    schema: FilterSchema;
    onChange: (value: string) => void;
}
