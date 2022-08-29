import React, {useState} from "react";

import { FilterProps } from "../Filter";

const Select = (props: FilterProps) => {
    const [value, setValue] = useState(props.schema.initialValue || '');

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
            <select className="form-input select"
                    id={props.schema.id}
                    name={props.schema.id}
                    value={value}
                    placeholder={props.schema.placeholder}
                    onChange={onChangeHandler} >
                <option value="">Todos</option>
                {
                    props.schema.options && props.schema.options.map(option => (
                        <option key={option.key} value={option.key}>
                            { option.value }
                        </option>
                    ))
                }
            </select>
        </div>
    )
};

export default Select;
