import React, {useState} from "react";

import {FilterProps} from "../../../../../types/common";

const Text = (props: FilterProps) => {
    const [value, setValue] = useState(props.schema.initialValue || '');

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        props.onChange(e.target.value);
    }

    return (
        <div className="form-group">
            {
                props.schema.withLabel &&
                    <label htmlFor={props.schema.id} className="form-label">
                        <small>{props.schema.label}</small>
                    </label>
            }
            <input className="form-input"
                   id={props.schema.id}
                   name={props.schema.id}
                   placeholder={props.schema.placeholder}
                   maxLength={props.schema.maxLength}
                   value={value}
                   onChange={onChangeHandler} />
        </div>
    )
};

export default Text;
