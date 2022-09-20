import {useCallback} from "react";
import useFetch from "./useFetch";
import useSelect from "./useSelect";
import {Option} from "../types/common";

const useFetchSelect = (getData: () => Promise<Option[]>, onSelectedChanged: (x?: string) => void, defaultValueId?: string) => {
    const getSelectData = useCallback(() => getData(), [getData]);

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
