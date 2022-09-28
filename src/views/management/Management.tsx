import React from "react";

const Management = () => (
    <iframe src={process.env.REACT_APP_ADMINISTRATION_PANEL as string} className="w-full h-full" />
);

export default Management;
