import {useEffect, useState} from "react";
import {PropsValue} from "react-select";

export interface SelectOption {
    value: string | number;
    label: string | number;
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

const useSelect = <T>(options: T[], getValue: (x: T) => string | number, getLabel: (x: T) => string | number, onSelectedChanged: (x?: string | number) => void, defaultValueId?: string) => {
    const [selectedOption, setSelectedOption] = useState<PropsValue<SelectOption>>(null);
    const [optionsList, setOptionsList] = useState(options);

    useEffect(() => {
        if (options !== optionsList) setOptionsList(options);

        const selected = options.find(x => getValue(x) === defaultValueId);

        if (selected) {
            const newSelectedOption = { value: getValue(selected), label: getLabel(selected) };
            setSelectedOption(newSelectedOption);
        }
    }, [options, getValue, getLabel]);

    const onSelectedChangedHandler = (option: SelectOption | null) => {
        if (!optionsList) return;

        const selectedId = option?.value || undefined;

        onSelectedChanged && onSelectedChanged(selectedId);

        const selected = optionsList.find(x => getValue(x) === selectedId);

        if (selected) {
            const newSelectedOption = { value: getValue(selected), label: getLabel(selected) };
            setSelectedOption(newSelectedOption);
        }
    }

    return {
        options: (optionsList || []).map(x => ({ value: getValue(x), label: getLabel(x) })),
        isDisabled: !optionsList || optionsList?.length === 0,
        value: selectedOption,
        onChange: onSelectedChangedHandler,
        styles
    }
};

export default useSelect;
