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
    assessments?: Assessment;
    isReadOnly?: boolean;
}

const AssessmentVisualizerEditor = ({ json, onAssessmentSubmit, assessments, isReadOnly = false }: AssessmentVisualizerEditorProps) => (
    <Editor resolver={{MultipleOption, FreeText}} enabled={!isReadOnly}>
        <AssessmentVisualizerComponent json={json}
                                       onAssessmentSubmit={onAssessmentSubmit}
                                       isReadOnly={isReadOnly}
                                       assessment={assessments} />
    </Editor>
);

export default AssessmentVisualizerEditor;
