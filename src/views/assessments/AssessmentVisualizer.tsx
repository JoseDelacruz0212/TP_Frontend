import React from "react";
import {Navigate, useLocation} from "react-router-dom";

import {useAuthContext} from "../../contexts/AuthContext";
import AssessmentProvider from "../../contexts/AssessmentContext";

import AssessmentVisualizerEditor from "../../components/assessments/assessment-visualizer/AssessmentVisualizerEditor";
import withPermission from "../../hoc/with-permission/withPermission";

import {Permissions} from "../../types/auth";
import {Assessment} from "../../types/communication/responses/assessment";
import {AssessmentStatus} from "../../types/assessment-status";

interface LocationState {
    assessment: Assessment;
}

const AssessmentVisualizer = () => {
    const location = useLocation();
    const state = location.state as LocationState;

    const { hasPermissionFor } = useAuthContext();

    if (!state?.assessment || state.assessment.status !== AssessmentStatus.STARTED) {
        return <Navigate to="/assessments" />;
    }

    const onAssessmentSubmit = (assessment: string) => {
        console.log(assessment);
    };

    return (
        <AssessmentProvider assessment={state?.assessment}>
            <AssessmentVisualizerEditor json={json}
                                        onAssessmentSubmit={onAssessmentSubmit}
                                        hideButton={!hasPermissionFor(Permissions.ASSESSMENT_SUBMIT)}
                                        assessments={state?.assessment} />
        </AssessmentProvider>
    )
}

const json = '';

export default withPermission(AssessmentVisualizer, Permissions.ASSESSMENT_VISUALIZE);
