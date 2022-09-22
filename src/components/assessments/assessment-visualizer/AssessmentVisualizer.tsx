import React, {FormEvent} from "react";
import {Element, Frame, useEditor} from "@craftjs/core";

import {AssessmentStatus} from "../../../types/assessment-status";
import {Assessment} from "../../../types/communication/responses/assessment";

import AssessmentTimeBar from "./AssessmentTimeBar";
import SendRequest from "./SendRequest";
import HasPermission from "../../../hoc/with-permission/HasPermission";
import {Permissions} from "../../../types/auth";
import AssignPoints from "./AssignPoints";
import {toast} from "react-toastify";
import ConfirmationToast from "../../common/confirmation-toast/ConfirmationToast";

interface AssessmentVisualizerProps {
    json: string;
    onAssessmentSubmit: (assessment: string) => void;
    onQualificationUpdate: (x: number) => void;
    isReadOnly?: boolean;
    assessment?: Assessment;
    isSubmitting?: boolean;
    onSendRequest: () => void;
    isAssigningPoints?: boolean;
}


const AssessmentVisualizer = ({ json, onAssessmentSubmit, assessment, isReadOnly = false, isSubmitting = false, onSendRequest, onQualificationUpdate, isAssigningPoints = false }: AssessmentVisualizerProps) => {
    const submitConfirmationToast = React.useRef<any>(null);

    const { query } = useEditor();

    const showConfirmationMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        submitConfirmationToast.current = toast(
            <ConfirmationToast text="¿Desea enviar el examen? Asegurese de hacer respondido todas las preguntas antes de enviar"
                               onClose={() => toast.dismiss(submitConfirmationToast.current)}
                               onSend={onAssessmentSubmitHandler} />, {
            closeButton: true,
            autoClose: false,
            closeOnClick: false,
            progress: 100
        })
    }

    const onAssessmentSubmitHandler = () => {
        toast.dismiss(submitConfirmationToast.current);
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
            </div>
            {
                assessment &&
                <form onSubmit={showConfirmationMessage} className="flex flex-col space-y-10">
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
            <HasPermission permission={Permissions.ASSESSMENT_ASSIGN_POINTS}>
                { assessment && assessment.status === AssessmentStatus.FINISHED && <AssignPoints onQualificationUpdate={onQualificationUpdate} isDisabled={isAssigningPoints} /> }
            </HasPermission>
        </>
    );
};

export default AssessmentVisualizer;
