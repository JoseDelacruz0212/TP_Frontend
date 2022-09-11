import React from "react";
import {Editor} from "@craftjs/core";

import MultipleOption from "../assessment-creator/toolbox/tools/MultipleOption";
import FreeText from "../assessment-creator/toolbox/tools/FreeTextOption";
import AssessmentVisualizerComponent from "./AssessmentVisualizer";

interface AssessmentVisualizerEditorProps {
    json: string;
    onAssessmentSubmit: (assessment: string) => void;
    hideButton?: boolean;
}

const AssessmentVisualizerEditor = ({ json, onAssessmentSubmit, hideButton }: AssessmentVisualizerEditorProps) => (
    <Editor resolver={{MultipleOption, FreeText}} enabled={false}>
        <AssessmentVisualizerComponent json={json} onAssessmentSubmit={onAssessmentSubmit} hideButton={hideButton} />
    </Editor>
);

export default AssessmentVisualizerEditor;
