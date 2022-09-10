import React     from "react";
import {IconType} from "react-icons";

interface ToolboxButton {
    icon?: React.ReactElement<IconType>,
}

const ToolboxButton = React.forwardRef<HTMLButtonElement, ToolboxButton>(({ icon }, ref) => (
    <button ref={ref} className="rounded-md border shadow-md p-2 flex justify-center items-center">
        {icon}
    </button>
));

export default ToolboxButton
