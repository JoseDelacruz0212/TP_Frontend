import React from "react";
import {Editor} from "@craftjs/core";

import {Assessment} from "../../../types/communication/responses/assessment";

import MultipleOption from "../assessment-creator/toolbox/tools/MultipleOption";
import FreeText from "../assessment-creator/toolbox/tools/FreeTextOption";
import AssessmentVisualizerComponent from "./AssessmentVisualizer";

interface AssessmentVisualizerEditorProps {
    json: string;
    onAssessmentSubmit: (assessment: string) => void;
    hideButton?: boolean;
    assessments?: Assessment
}

const AssessmentVisualizerEditor = ({ json, onAssessmentSubmit, hideButton, assessments }: AssessmentVisualizerEditorProps) => (
    <Editor resolver={{MultipleOption, FreeText}} enabled={false}>
        <AssessmentVisualizerComponent json={json}
                                       onAssessmentSubmit={onAssessmentSubmit}
                                       hideButton={hideButton}
                                       assessment={assessments} />
    </Editor>
);

export default AssessmentVisualizerEditor;
