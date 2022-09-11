import React, {useEffect, useState} from "react";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

import {useAuthContext} from "../../contexts/AuthContext";
import AssessmentProvider from "../../contexts/AssessmentContext";

import AssessmentVisualizerEditor from "../../components/assessments/assessment-visualizer/AssessmentVisualizerEditor";
import withPermission from "../../hoc/with-permission/withPermission";

import {Permissions} from "../../types/auth";
import {AssessmentStatus} from "../../types/assessment-status";
import {Assessment} from "../../types/communication/responses/assessment";
import AssessmentService from "../../services/AssessmentService";

interface LocationState {
    assessmentId: string;
    status: number;
}

const AssessmentVisualizer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState;

    const id = state?.assessmentId;
    const status = state?.status;

    const [assessment, setAssessment] = useState<Assessment | null>(null);

    const { hasPermissionFor } = useAuthContext();

    useEffect(() => {
        if (id) {
            AssessmentService.getById(id).then(setAssessment);
        }
    }, [id]);

    const canSubmit = hasPermissionFor(Permissions.ASSESSMENT_SUBMIT);
    const canAssignPoints = hasPermissionFor(Permissions.ASSESSMENT_ASSIGN_POINTS);

    if (!canSubmit && !canAssignPoints) return <Navigate to="/assessments" />;

    if (canSubmit && status !== AssessmentStatus.STARTED) return <Navigate to="/assessments" />;
    if (canAssignPoints && status !== AssessmentStatus.FINISHED) return <Navigate to="/assessments" />;

    if (!assessment) return null;

    const onAssessmentSubmit = (assessment: string) => {
        AssessmentService.generatePoints(id, assessment).then(
            () => navigate("/assessments")
        );
    };

    return (
        <AssessmentProvider assessment={assessment}>
            <AssessmentVisualizerEditor json={assessment.json}
                                        onAssessmentSubmit={onAssessmentSubmit}
                                        hideButton={!hasPermissionFor(Permissions.ASSESSMENT_SUBMIT)}
                                        assessments={assessment} />
        </AssessmentProvider>
    )
}

export default withPermission(AssessmentVisualizer, Permissions.ASSESSMENT_VISUALIZE);
