import React, {FormEvent} from "react";
import {Element, Frame, useEditor} from "@craftjs/core";

import {AssessmentStatus} from "../../../types/assessment-status";
import {Assessment} from "../../../types/communication/responses/assessment";

import AssessmentTimeBar from "./AssessmentTimeBar";
import SendRequest from "./SendRequest";
import HasPermission from "../../../hoc/with-permission/HasPermission";
import {Permissions} from "../../../types/auth";
import AssignPoints from "./AssignPoints";

interface AssessmentVisualizerProps {
    json: string;
    onAssessmentSubmit: (assessment: string) => void;
    isReadOnly?: boolean;
    assessment?: Assessment;
    isSubmitting?: boolean;
    onSendRequest: () => void;
}


const AssessmentVisualizer = ({ json, onAssessmentSubmit, assessment, isReadOnly = false, isSubmitting = false, onSendRequest }: AssessmentVisualizerProps) => {
    const { query } = useEditor();

    const onAssessmentSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAssessmentSubmit(query.serialize());
    }

    const SendButton = () => (
        <div className="flex justify-end">
            <button type="submit" className="button-primary" disabled={isSubmitting}>
                Enviar
            </button>
        </div>
    );

    return (
        <>
            <div className="flex justify-end space-x-5">
                <HasPermission permission={Permissions.ASSESSMENT_REQUEST_ACTION}>
                    { assessment && assessment.status === AssessmentStatus.FINISHED && <SendRequest onSendRequest={onSendRequest} /> }
                </HasPermission>
                <HasPermission permission={Permissions.ASSESSMENT_ASSIGN_POINTS}>
                    { assessment && assessment.status === AssessmentStatus.FINISHED && <AssignPoints /> }
                </HasPermission>
            </div>
            {
                assessment &&
                <form onSubmit={onAssessmentSubmitHandler} className="flex flex-col space-y-10">
                    {
                        assessment.status === AssessmentStatus.STARTED &&
                        <AssessmentTimeBar availableOn={assessment.availableOn}
                                           duration={assessment.duration}
                                           status={assessment.status} />
                    }
                    <Frame data={json}>
                        <Element id="canvas" is="div" canvas />
                    </Frame>
                    { !isReadOnly && assessment.status === AssessmentStatus.STARTED && <SendButton /> }
                </form>
            }
        </>
    );
};

export default AssessmentVisualizer;
