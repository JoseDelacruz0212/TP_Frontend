import React from "react";
import {Editor, Element, Frame} from "@craftjs/core";

import Toolbox from "../../components/assessments/assessment-creator/toolbox/Toolbox";
import SettingsPanel from "../../components/assessments/assessment-creator/SettingsPanel";
import MultipleOption from "../../components/assessments/assessment-creator/toolbox/tools/MultipleOption";
import TopBar from "../../components/assessments/assessment-creator/TopBar";
import FreeText from "../../components/assessments/assessment-creator/toolbox/tools/FreeTextOption";
import withPermission from "../../hoc/with-permission/withPermission";

import {Permissions} from "../../types/auth";

const AssessmentCreator = () => {
    const onDesignSave = (design: string) => {
        console.log(design);
    };

    const onDesignPublish = (design: string) => {
        console.log(design);
    };

    return (
        <Editor resolver={{MultipleOption, FreeText}}>
            <div className="grid grid-cols-3 gap-5 min-h-full">
                <div className="order-2 col-span-4 lg:order-1 lg:col-span-2 min-h-full">
                    <div className="rounded-md shadow-md min-h-full p-2 flex flex-col space-y-5">
                        <TopBar onDesignSave={onDesignSave} onDesignPublish={onDesignPublish} />
                        <div className="border rounded-md flex-1 flex">
                            <Frame>
                                <Element id="canvas" is="div" canvas />
                            </Frame>
                        </div>
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

export default withPermission(AssessmentCreator, Permissions.ASSESSMENT_CREATOR);
