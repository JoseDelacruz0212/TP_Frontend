import React, {FormEvent} from "react";
import {Element, Frame, useEditor} from "@craftjs/core";

import {AssessmentStatus} from "../../../types/assessment-status";
import {Assessment} from "../../../types/communication/responses/assessment";

import AssessmentTimeBar from "./AssessmentTimeBar";

interface AssessmentVisualizerProps {
    json: string;
    onAssessmentSubmit: (assessment: string) => void;
    hideButton?: boolean;
    assessment?: Assessment
}

const AssessmentVisualizer = ({ json, onAssessmentSubmit, hideButton = false, assessment }: AssessmentVisualizerProps) => {
    const { query } = useEditor();

    const onAssessmentSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAssessmentSubmit(query.serialize());
    }

    const SendButton = () => (
        <div className="flex justify-end">
            <button type="submit" className="button-primary text-on-primary">
                Enviar
            </button>
        </div>
    );

    return (
        <>
            {
                assessment &&
                <form onSubmit={onAssessmentSubmitHandler} className="flex flex-col space-y-10">
                    {
                        assessment.status === AssessmentStatus.STARTED &&
                        <AssessmentTimeBar availableOn={assessment.availableOn}
                                           duration={assessment.duration}
                                           status={assessment.status} />
                    }
                    { !hideButton && assessment.status === AssessmentStatus.STARTED && <SendButton /> }
                    <Frame data={json}>
                        <Element id="canvas" is="div" canvas />
                    </Frame>
                    { !hideButton && assessment.status === AssessmentStatus.STARTED && <SendButton /> }
                </form>
            }
        </>
    );
};

export default AssessmentVisualizer;