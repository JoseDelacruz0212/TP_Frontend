import React, {ReactElement} from "react";
import {IconType} from "react-icons";
import {Entity} from "../../communication/responses/entity";
import {ConvertorCreator, FilterSchemaCreator} from "../../hooks/table";
import {CrudService} from "../../communication/crud-service";
import {FormInputs} from "../common/modal";

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
    link?: string;
    permission?: string;
    type: string;
};

export type NavMenuItemProps = {
    item: NavMenuItem;
};

export type NavMenuProps = {
    items: NavMenuItem[];
    selected?: number;
    onOptionSelected: (newOption: number) => void;
};

export type SideBarProps = {
    titleIcon: ReactElement<IconType>;
    title: string;
    isMenuOpen: boolean;
    toggleOpen: () => void;
}

export type TableViewProps<T extends Entity, F> = {
    title: string;
    filterSchemaCreator: FilterSchemaCreator<F>;
    convertorCreator: ConvertorCreator<T>
    columns: string[];
    service: CrudService<T, F>;
    sidePanelId: string;
    sidePanelCreateTitle: string;
    sidePanelEditTitle: string;
    defaultItemSchema: T;
    addButtonText: string;
    formInputs: React.ComponentType<FormInputs<T>>;
    onItemClick?: (id: number | string) => void;
    showAuditInfo?: boolean;
}
