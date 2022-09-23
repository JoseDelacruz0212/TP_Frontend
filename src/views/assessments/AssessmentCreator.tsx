import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Editor, Element, Frame} from "@craftjs/core";

import Toolbox from "../../components/assessments/assessment-creator/toolbox/Toolbox";
import SettingsPanel from "../../components/assessments/assessment-creator/SettingsPanel";
import MultipleOption, {
    MultipleOptionProps
} from "../../components/assessments/assessment-creator/toolbox/tools/MultipleOption";
import TopBar from "../../components/assessments/assessment-creator/TopBar";
import FreeText, {FreeTextProps} from "../../components/assessments/assessment-creator/toolbox/tools/FreeTextOption";
import withPermission from "../../hoc/with-permission/withPermission";

import {Permissions} from "../../types/auth";
import AssessmentService from "../../services/AssessmentService";
import {Assessment} from "../../types/communication/responses/assessment";
import {AssessmentStatus} from "../../types/assessment-status";
import {toast} from "react-toastify";

const AssessmentCreator = () => {
    const [canPublish, setCanPublish] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const [assessment, setAssessment] = useState<Assessment | undefined>(undefined);

    useEffect(() => {
        if (id) {
            AssessmentService.getById(id).then(setAssessment);
        }
    }, [id]);

    const onDesignSave = (json: string) => {
        const isValid = validateQuestionSchema(json);

        console.log(isValid);

        if (isValid) {
            if (assessment) {
                AssessmentService.saveItem({...assessment, json})
                    .then(message => {
                        toast.success(message)
                        setCanPublish(true);
                    })
                    .catch(error => toast.error(error));
            }
        } else {
            toast.error("Las preguntas deben tener una descripción, puntos equivalentes y una respuesta establecida");
        }
    };

    const onDesignPublish = (json: string) => {
        if (assessment) {
            AssessmentService.saveItem({ ...assessment, json, status: AssessmentStatus.PUBLISHED})
                .then(message => {
                    toast.success(message)
                    navigate("/assessments")
                })
                .catch(error => toast.error(error))
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
                                <TopBar onDesignSave={onDesignSave}
                                        onDesignPublish={onDesignPublish}
                                        canPublish={canPublish} />
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

type Node = {
    type: {
        resolvedName: string;
    },
    props: any
}

const validateQuestionSchema = (schema: string) => {
    const object = JSON.parse(schema);

    if (!object["ROOT"] || !object["ROOT"]["nodes"]) return false;

    const nodes = object["ROOT"]["nodes"] as string[];

    if (!nodes || nodes.length === 0) return false;

    let isValid = true;

    nodes.forEach(node => {
        const nodeInfo = object[node] as Node;

        let props = null;

        if (nodeInfo.type.resolvedName === "MultipleOption") props = nodeInfo.props as MultipleOptionProps;
        else if (nodeInfo.type.resolvedName === "FreeText") props = nodeInfo.props as FreeTextProps;

        if (!props || !props.question || !props.answer || !props.points) {
            isValid = false;
        }
    });

    return isValid;
}

export default withPermission(AssessmentCreator, Permissions.ASSESSMENT_CREATOR);
