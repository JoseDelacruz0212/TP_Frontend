import React, {useState} from "react";
import moment from "moment";

import { FilterProps } from "../Filter";

const DatePicker = (props: FilterProps) => {
    const [value, setValue] = useState(new Date(props.schema.initialValue as string) || null);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = moment(e.target.value).toDate()

        setValue(newDate);
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
                   value={moment(value).format(`YYYY-MM-DD${props.schema.withTime ? ' HH:mm' : ''}`)}
                   onChange={onChangeHandler} />
        </div>
    )
};

export default DatePicker;
