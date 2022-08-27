import React from "react";

export type Option = {
    key: number | string;
    value: number | string;
}

export interface FilterSchema {
    id: string;
    type: React.ComponentType<FilterProps>;
    maxLength?: number;
    options?: Option[];
    startDate?: Date;
    endDate?: Date;
    onChange: (value: string) => void;
    withLabel?: boolean;
    placeholder?: string;
    label?: string;
    initialValue?: number | string;
    withTime?: boolean;
}

export interface FilterProps {
    schema: FilterSchema;
    onChange: (value: string) => void;
}

const Filter = ({ schema, onChange }: FilterProps) => {
    const ComponentType = schema.type;

    return (
        <ComponentType onChange={onChange} schema={schema} />
    );
};

export default Filter;
