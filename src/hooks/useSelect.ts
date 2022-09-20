import {useEffect, useState} from "react";
import {PropsValue} from "react-select";

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
        height: '2.25rem',
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

const useSelect = (onSelectedChanged: (x?: string) => void, options?: SelectOption[], defaultValueId?: string) => {
    const [selectedOption, setSelectedOption] = useState<PropsValue<SelectOption>>(null);

    useEffect(() => {
        const selected = options?.find(x => x.value === defaultValueId);

        if (selected) {
            setSelectedOption(selected);
        }
    }, [options]);

    const onSelectedChangedHandler = (option: SelectOption | null) => {
        if (!options) return;

        const selectedId = option?.value || undefined;

        onSelectedChanged && onSelectedChanged(selectedId);

        const selected = options.find(x => x.value === selectedId);

        if (selected) {
            setSelectedOption(selected);
        }
    }

    return {
        options: options || [],
        isDisabled: !options || options?.length === 0,
        value: selectedOption,
        onChange: onSelectedChangedHandler,
        styles
    }
};

export default useSelect;
