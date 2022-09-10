import React from "react";

import AssessmentVisualizerEditor from "../../components/assessments/assessment-visualizer/AssessmentVisualizerEditor";

const AssessmentVisualizer = () => {
    const onAssessmentSubmit = (assessment: string) => {
        console.log(assessment);
    };

    return <AssessmentVisualizerEditor json={json} onAssessmentSubmit={onAssessmentSubmit} />;
}

const json = '';

export default AssessmentVisualizer;
