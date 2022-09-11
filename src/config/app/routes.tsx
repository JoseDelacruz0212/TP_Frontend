import React from "react";
import menuOptions from "./menu-options";
import {IoChevronForwardOutline} from "react-icons/io5";

export const getTitleForCurrentLocation = (location: string, state?: any) => {
    const TitleComponent = ({ title }: { title: string }) => (
        <div className="flex items-center space-x-2">
            <span className="font-light">{state.subtitle}</span>
            <IoChevronForwardOutline/>
            <span>{title}</span>
        </div>
    );

    if (location.includes('/users') && state && state.subtitle) return <TitleComponent title="Usuarios" />;
    if (location.includes('/assessments') && state && state.subtitle) return <TitleComponent title="Evaluaciones" />;
    if (location.includes('/assessment-creator')) return 'Diseñador de evaluación';
    if (location.includes('/assessment-visualizer')) return state && state.subtitle ? state.subtitle : 'Evaluación';

    const menuOption = menuOptions.find(x => x.link && location.includes(x.link));

    if (menuOption) return menuOption.title!;
    return "";
}

export const getActiveOptionForCurrentLocation = (location: string) => {
    return menuOptions.find(x => x.link && location.includes(x.link));
}
