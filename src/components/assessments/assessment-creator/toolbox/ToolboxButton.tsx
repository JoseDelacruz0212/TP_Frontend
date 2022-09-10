import React from "react";
import {IconType} from "react-icons";

interface ToolboxButtonProps {
    icon?: React.ReactElement<IconType>,
}

const ToolboxButton = React.forwardRef<HTMLButtonElement, ToolboxButtonProps>(({ icon }, ref) => (
    <button ref={ref} className="rounded-md border shadow-md p-2 flex justify-center items-center">
        {icon}
    </button>
));

export default ToolboxButton
