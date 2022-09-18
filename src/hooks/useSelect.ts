import {useCallback, useState} from "react";
import {PropsValue} from "react-select";
import useFetch from "./useFetch";

export interface SelectOption {
    value: string;
    label: string;
}

const styles = {
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

const useSelect = <T>(getData: () => Promise<T[]>, getValue: (x: T) => string, getLabel: (x: T) => string, onSelectedChanged: (x?: string) => void, defaultValueId?: string) => {
    const [selectedOption, setSelectedOption] = useState<PropsValue<SelectOption>>(null);

    const getSelectData = useCallback(() => getData().then(data => {
        const selected = data.find(x => getValue(x) === defaultValueId);

        if (selected) {
            const newSelectedOption = { value: getValue(selected), label: getLabel(selected) };
            setSelectedOption(newSelectedOption);
        }

        return data;
    }), [getData]);

    const { data, isLoading } = useFetch<T[]>(getSelectData);

    const onSelectedChangedHandler = (option: SelectOption | null) => {
        if (!data) return;

        const selectedId = option?.value || undefined;

        onSelectedChanged && onSelectedChanged(selectedId);

        const selected = data.find(x => getValue(x) === selectedId);

        if (selected) {
            const newSelectedOption = { value: getValue(selected), label: getLabel(selected) };
            setSelectedOption(newSelectedOption);
        }
    }

    return {
        options: (data || []).map(x => ({ value: getValue(x), label: getLabel(x) })),
        isDisabled: !data || data?.length === 0,
        isLoading,
        value: selectedOption,
        onChange: onSelectedChangedHandler,
        styles
    }
};

export default useSelect;
