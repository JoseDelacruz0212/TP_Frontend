import React from "react";

import {useAuthContext} from "../../contexts/AuthContext";
import AssessmentVisualizerEditor from "../../components/assessments/assessment-visualizer/AssessmentVisualizerEditor";

import {Permissions} from "../../types/auth";

const AssessmentVisualizer = () => {
    const { hasPermissionFor } = useAuthContext();


    const onAssessmentSubmit = (assessment: string) => {
        console.log(assessment);
    };

    return <AssessmentVisualizerEditor json={json}
                                       onAssessmentSubmit={onAssessmentSubmit}
                                       hideButton={!hasPermissionFor(Permissions.ASSESSMENT_SUBMIT)} />;
}

const json = '';

export default AssessmentVisualizer;
