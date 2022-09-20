import {useCallback, useMemo} from "react";
import useFetch from "./useFetch";
import useSelect from "./useSelect";

const useFetchSelect = <T>(getData: () => Promise<T[]>, getValue: (x: T) => string, getLabel: (x: T) => string, onSelectedChanged: (x?: string) => void, defaultValueId?: string) => {
    const getSelectData = useCallback(() => getData(), [getData]);

    const defaultData = useMemo(() => [], []);

    const { data, isLoading } = useFetch<T[]>(getSelectData);
    const { options, isDisabled, onChange, value, styles } = useSelect(getValue, getLabel, onSelectedChanged, data, defaultValueId);

    return {
        options,
        isDisabled,
        isLoading,
        value,
        onChange,
        styles
    }
};

export default useFetchSelect;
