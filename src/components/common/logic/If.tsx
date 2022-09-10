import React from "react";

interface IfProps {
    children: React.ReactNode;
    condition: boolean;
}

const If = ({ children, condition }: IfProps) => !condition ? null : <>{children}</>;

export default If;
