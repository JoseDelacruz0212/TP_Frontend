import React, {LegacyRef} from "react";
import {Editor, Element, Frame, useNode} from "@craftjs/core";

import Toolbox from "../../components/assessment-creator/toolbox/Toolbox";
import SettingsPanel from "../../components/assessment-creator/SettingsPanel";
import MultipleOption from "../../components/assessment-creator/toolbox/tools/MultipleOption";
import TopBar from "../../components/assessment-creator/TopBar";
import FreeText from "../../components/assessment-creator/toolbox/tools/FreeTextOption";
import Image from "../../components/assessment-creator/toolbox/tools/Image";

const Canvas = ({ children }: { children: React.ReactNode }) => {
    const { connectors: { connect } } = useNode();

    return (
        <div ref={connect as LegacyRef<HTMLDivElement>} className="flex-1">
            {children}
        </div>
    );
};

const AssessmentCreator = () => {
    const onDesignSave = (design: string) => {
        console.log(design);
    };

    return (
        <Editor resolver={{MultipleOption, FreeText, Image, Canvas}}>
            <div className="grid grid-cols-3 gap-5 min-h-full">
                <div className="order-2 col-span-4 lg:order-1 lg:col-span-2 min-h-full">
                    <div className="rounded-md shadow-md min-h-full p-2 flex flex-col space-y-5">
                        <TopBar onDesignSave={onDesignSave} />
                        <Frame>
                            <Element id="canvas" is={Canvas} canvas>

                            </Element>
                        </Frame>
                    </div>
                </div>
                <div className="order-1 col-span-4 lg:order-2 lg:col-span-1 relative">
                    <div className="flex flex-col space-y-5 sticky inset-0 top-6">
                        <Toolbox />
                        <SettingsPanel />
                    </div>
                </div>
            </div>
        </Editor>
    );
};

export default AssessmentCreator;
