import React, {createContext, useContext} from "react";

interface AssessmentContext {
    status: number;
};

interface AssessmentContextProps {
    status: number;
    children: React.ReactNode;
};

const AssessmentContext = createContext<AssessmentContext>({
    status: 0
});

const AssessmentProvider = ({ status, children }: AssessmentContextProps) => {
    return (
        <AssessmentContext.Provider value={{ status }}>
            { children }
        </AssessmentContext.Provider>
    )
};

export const useAssessmentContext = () => useContext(AssessmentContext);

export default AssessmentProvider;
