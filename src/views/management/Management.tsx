import React from "react";

const Management = () => (
    <iframe src={process.env.REACT_APP_ADMINISTRATION_PANEL as string} className="flex-1" />
);

export default Management;
