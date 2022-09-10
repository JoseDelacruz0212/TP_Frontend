import React from "react";
import {useEditor} from "@craftjs/core";
import {IoRadioButtonOnOutline, IoTextOutline} from "react-icons/io5";

import ToolboxButton from "./ToolboxButton";
import MultipleOption from "./tools/MultipleOption";
import FreeText from "./tools/FreeTextOption";

const Toolbox = () => {
    const { connectors } = useEditor();

    return (
        <div className="rounded-md shadow-md p-2 flex flex-col space-y-5">
            <span className="subtitle">Herramientas</span>
            <div className="grid grid-cols-5 gap-3">
                <ToolboxButton ref={ref => connectors.create(ref!, <MultipleOption />)} icon={<IoRadioButtonOnOutline />} />
                <ToolboxButton ref={ref => connectors.create(ref!, <FreeText />)} icon={<IoTextOutline />} />
                {/*<ToolboxButton ref={ref => connectors.create(ref!, <Image />)} icon={<IoImageOutline />} />*/}
            </div>
        </div>
    );
};

export default Toolbox;
