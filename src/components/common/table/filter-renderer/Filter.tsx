import React from "react";

import {FilterProps} from "../../../../types/components/common/table/filters";

const Filter = ({ schema, onChange }: FilterProps) => {
    const ComponentType = schema.type;

    return (
        <ComponentType onChange={onChange} schema={schema} />
    );
};

export default Filter;
