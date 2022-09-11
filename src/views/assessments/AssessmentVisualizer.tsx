import React from "react";

import {useAuthContext} from "../../contexts/AuthContext";
import AssessmentVisualizerEditor from "../../components/assessments/assessment-visualizer/AssessmentVisualizerEditor";

import {Permissions} from "../../types/auth";
import {useLocation} from "react-router-dom";
import AssessmentProvider from "../../contexts/AssessmentContext";

interface LocationState {
    status: number;
}

const AssessmentVisualizer = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    const { hasPermissionFor } = useAuthContext();

    const onAssessmentSubmit = (assessment: string) => {
        console.log(assessment);
    };

    return (
        <AssessmentProvider status={state?.status}>
            <AssessmentVisualizerEditor json={json}
                                        onAssessmentSubmit={onAssessmentSubmit}
                                        hideButton={!hasPermissionFor(Permissions.ASSESSMENT_SUBMIT)} />
        </AssessmentProvider>
    )
}

const json = '';

export default AssessmentVisualizer;
