import React, {useState} from "react";
import Select from "react-select";

import {FilterProps, Option} from "../../../../../types/common";
import useSelect from "../../../../../hooks/useSelect";

const getValue = (option: Option) => option.value;
const getLabel = (option: Option) => option.label;

const SelectFilter = (props: FilterProps) => {
    const onChangeHandler = (newValue?: string | number) => {
        newValue && props.onChange(newValue);
    }

    const options = props.schema.options || [];
    const initialValue = props.schema.initialValue ? props.schema.initialValue as string : '';

    const selectProps = useSelect(options, getValue, getLabel, onChangeHandler, initialValue);

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
