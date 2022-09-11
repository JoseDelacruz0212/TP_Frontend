import React, {createContext, useContext} from "react";
import {Assessment} from "../types/communication/responses/assessment";

interface AssessmentProviderContext {
    assessment?: Assessment;
};

interface AssessmentContextProps {
    assessment: Assessment;
    children: React.ReactNode;
};

const AssessmentContext = createContext<AssessmentProviderContext>({
    assessment: undefined
});

const AssessmentProvider = ({ assessment, children }: AssessmentContextProps) => {
    return (
        <AssessmentContext.Provider value={{ assessment }}>
            { children }
        </AssessmentContext.Provider>
    )
};

export const useAssessmentContext = () => useContext(AssessmentContext);

export default AssessmentProvider;
