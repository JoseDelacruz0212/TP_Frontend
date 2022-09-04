import React from "react";

import {ChipProps} from "../../../types/components/common/chip";

const Chip = ({ label, className }: ChipProps) => {
    return (
        <div className={`rounded-md shadow px-2 py-1 ${className}`}>
            <small>{ label }</small>
        </div>
    )
};

export default Chip;
