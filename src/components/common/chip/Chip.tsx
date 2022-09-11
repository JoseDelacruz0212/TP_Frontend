import React from "react";

interface ChipProps {
    label: string;
    className: string;
}

const Chip = ({ label, className }: ChipProps) => {
    return (
        <div className={`rounded-md shadow px-2 py-1 text-center ${className}`}>
            <small>{ label }</small>
        </div>
    )
};

export default Chip;
