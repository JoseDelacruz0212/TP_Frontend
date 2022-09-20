import {useCallback} from "react";
import useFetch from "./useFetch";
import useSelect, {SelectOption} from "./useSelect";

const useFetchSelect = (getData: () => Promise<SelectOption[]>, onSelectedChanged: (x?: string) => void, defaultValueId?: string) => {
    const getSelectData = useCallback(() => getData(), []);

    const { data, isLoading } = useFetch(getSelectData);
    const { options, isDisabled, onChange, value, styles } = useSelect(onSelectedChanged, data, defaultValueId);

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
