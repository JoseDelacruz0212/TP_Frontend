import {ReactElement} from "react";
import {IconType} from "react-icons";

export type ProfileHeaderProps = {
    title: string;
    username: string;
    userImage?: string;
    onProfileClicked: () => void;
};

export type NavMenuItem = {
    key: number;
    label: string;
    icon?: ReactElement<IconType>;
    order: number;
    link: string;
};

export type NavMenuItemProps = {
    item: NavMenuItem;
};

export type NavMenuProps = {
    items: NavMenuItem[];
    selected: number;
    onOptionSelected: (newOption: number) => void;
};

export type SideBarProps = {
    titleIcon: ReactElement<IconType>;
    title: string;
    isMenuOpen: boolean;
    toggleOpen: () => void;
}
