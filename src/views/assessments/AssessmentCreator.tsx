import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Editor, Element, Frame} from "@craftjs/core";

import Toolbox from "../../components/assessments/assessment-creator/toolbox/Toolbox";
import SettingsPanel from "../../components/assessments/assessment-creator/SettingsPanel";
import MultipleOption from "../../components/assessments/assessment-creator/toolbox/tools/MultipleOption";
import TopBar from "../../components/assessments/assessment-creator/TopBar";
import FreeText from "../../components/assessments/assessment-creator/toolbox/tools/FreeTextOption";
import withPermission from "../../hoc/with-permission/withPermission";

import {Permissions} from "../../types/auth";
import AssessmentService from "../../services/AssessmentService";
import {Assessment} from "../../types/communication/responses/assessment";
import {AssessmentStatus} from "../../types/assessment-status";

const AssessmentCreator = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [assessment, setAssessment] = useState<Assessment | null>(null);

    useEffect(() => {
        if (id) {
            AssessmentService.getById(id).then(setAssessment);
        }
    }, [id]);

    const onDesignSave = (json: string) => {
        if (assessment) {
            AssessmentService.saveItem({ ...assessment, json}).then(
                () => {}
            );
        }
    };

    const onDesignPublish = (json: string) => {
        if (assessment) {
            AssessmentService.saveItem({ ...assessment, json, status: AssessmentStatus.PUBLISHED}).then(
                () => navigate("/assessments")
            );
        }
    };

    return (
        <>
            {
                assessment &&
                <Editor resolver={{MultipleOption, FreeText}}>
                    <div className="grid grid-cols-3 gap-5 min-h-full">
                        <div className="order-2 col-span-4 lg:order-1 lg:col-span-2 min-h-full">
                            <div className="rounded-md shadow-md min-h-full p-2 flex flex-col space-y-5">
                                <TopBar onDesignSave={onDesignSave} onDesignPublish={onDesignPublish} />
                                <div className="border rounded-md flex-1 flex">
                                    <Frame data={assessment.json}>
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
            }
        </>
    );
};

export default withPermission(AssessmentCreator, Permissions.ASSESSMENT_CREATOR);
