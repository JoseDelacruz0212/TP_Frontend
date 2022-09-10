import {ReactElement} from "react";
import {IconType} from "react-icons";

export type NavMenuItem = {
    key: number;
    label: string;
    icon?: ReactElement<IconType>;
    order: number;
    link?: string;
    permission?: string;
    type: string;
};
