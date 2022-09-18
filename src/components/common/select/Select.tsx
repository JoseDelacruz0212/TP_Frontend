import React from "react";

export interface SelectOption {
    value: string;
    label: string;
}

export const selectStyles = {
    control: (_: any, { isFocused }: any) => ({
        display: 'flex',
        borderWidth: '1px',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        borderRadius: '0.375rem',
        ...(isFocused ? {
            borderColor: '#5b6abf',
            borderWidth: '2px'
        } : {})
    }),
    valueContainer: (provided: object) => ({
        ...provided,
        margin: '0',
        padding: '0'
    }),
}
