import React from "react";
import Select from "react-select";

import {FilterProps} from "../../../../../types/common";
import useSelect, {SelectOption} from "../../../../../hooks/useSelect";

const SelectFilter = (props: FilterProps) => {
    const onChangeHandler = (newValue?: string) => {
        newValue && props.onChange(newValue);
    }

    const options = props.schema.options?.map(x => ({ value: x.value, label: x.label }) as SelectOption);
    const initialValue = props.schema.initialValue ? props.schema.initialValue as string : '';

    const selectProps = useSelect(onChangeHandler, options, initialValue);

    return (
        <div className="form-group">
            {
                props.schema.withLabel &&
                <label htmlFor={props.schema.id} className="form-label">
                    <small>{props.schema.label}</small>
                </label>
            }
            <Select {...selectProps}
                    id="edit-course-institution"
                    name="edit-course-institution"
                    placeholder={props.schema.placeholder} />
        </div>
    )
};

export default SelectFilter;
