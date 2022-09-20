import React from "react";
import Select from "react-select";

import {FilterProps} from "../../../../../types/common";
import useSelect from "../../../../../hooks/useSelect";

const SelectFilter = (props: FilterProps) => {
    const onChangeHandler = (newValue?: string) => {
        newValue && props.onChange(newValue);
    }

    const selectProps = useSelect(onChangeHandler, props.schema.options, props.schema.initialValue || '');

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
