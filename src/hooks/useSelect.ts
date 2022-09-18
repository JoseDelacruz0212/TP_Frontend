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
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T[]>([]);
    const [selectedOption, setSelectedOption] = useState<PropsValue<SelectOption>>(null);

    const onSelectedChangedHandler = (option: SelectOption | null) => {
        const selectedId = option?.value || undefined;

        onSelectedChanged && onSelectedChanged(selectedId);

        const selected = data.find(x => getValue(x) === selectedId);
        if (selected) {
            const newSelectedOption = { value: getValue(selected), label: getLabel(selected) };
            setSelectedOption(newSelectedOption);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getData().then(
            values => {
                setIsLoading(false);
                setData(values);

                const selected = values.find(x => getValue(x) === defaultValueId);
                if (selected) {
                    const newSelectedOption = { value: getValue(selected), label: getLabel(selected) };
                    setSelectedOption(newSelectedOption);
                }
            }
        ).catch(() => setIsLoading(false));
    }, []);

    return {
        options: data.map(x => ({ value: getValue(x), label: getLabel(x) })),
        isDisabled: !data || data?.length === 0,
        isLoading,
        value: selectedOption,
        onChange: onSelectedChangedHandler,
        styles
    }
};

export default useSelect;
