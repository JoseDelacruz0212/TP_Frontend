import React, {useState} from "react";

import { FilterProps } from "../Filter";

const DatePicker = (props: FilterProps) => {
    const [value, setValue] = useState(props.schema.initialValue as string || null);

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
                   type={props.schema.withTime ? 'datetime-local' : 'date'}
                   id={props.schema.id}
                   name={props.schema.id}
                   placeholder={props.schema.placeholder}
                   min={props.schema.startDate}
                   value={value || ''}
                   onChange={onChangeHandler} />
        </div>
    )
};

export default DatePicker;
