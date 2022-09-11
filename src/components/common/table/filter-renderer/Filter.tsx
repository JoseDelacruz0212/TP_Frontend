import React from "react";

import {FilterProps} from "../../../../types/common";

const Filter = ({ schema, onChange }: FilterProps) => {
    const ComponentType = schema.type;

    return (
        <ComponentType onChange={onChange} schema={schema} />
    );
};

export default Filter;
