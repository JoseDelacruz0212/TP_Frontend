import React from "react";

import {FilterRendererProps} from "../../../../types/components/common/table/filters";

import Filter  from "./Filter";

const FilterRenderer = ({ schemas }: FilterRendererProps) => {
    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4">
            {
                schemas.map(schema => <Filter key={schema.id}
                                              schema={schema}
                                              onChange={(value) => schema.onChange(value)} />)
            }
        </div>
    )
};

export default FilterRenderer;
