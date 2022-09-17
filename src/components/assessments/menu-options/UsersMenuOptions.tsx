import React from "react";
import If from "../../common/logic/If";
import HasPermission from "../../../hoc/with-permission/HasPermission";
import {Permissions} from "../../../types/auth";
import {IoBookOutline, IoCheckboxOutline, IoLockClosedOutline, IoPencilOutline, IoTrashOutline} from "react-icons/io5";
import {User} from "../../../types/communication/responses/user";

interface UsersMenuOptionsProps {
    rowData: User;
    onEdit: (x: User) => void;
    onDelete: (x: string) => void;
    onApprove: (x: string) => void;
    onRevoke: (x: string) => void;
    onAssign: (x: User) => void;
}

const UsersMenuOptions = ({ rowData, onEdit, onDelete, onApprove, onRevoke, onAssign }: UsersMenuOptionsProps) => (
    <>
        <If condition={!rowData.status}>
            <HasPermission permission={Permissions.USERS_APPROVE}>
                <div role="button" className="menu-option" onClick={() => onApprove(rowData.id!)}>
                    <div><IoCheckboxOutline /></div>
                    <span>Aprobar usuario</span>
                </div>
            </HasPermission>
        </If>
        <If condition={rowData.status === true}>
            <HasPermission permission={Permissions.USERS_REVOKE}>
                <div role="button" className="menu-option" onClick={() => onRevoke(rowData.id!)}>
                    <div><IoLockClosedOutline /></div>
                    <span>Desaprobar usuario</span>
                </div>
            </HasPermission>
        </If>
        <HasPermission permission={Permissions.USERS_ASSIGN_COURSE}>
            <div role="button" className="menu-option" onClick={() => onAssign(rowData)}>
                <div><IoBookOutline /></div>
                <span>Asignar a curso</span>
            </div>
        </HasPermission>,
        <HasPermission permission={Permissions.USERS_EDIT}>
            <div role="button" className="menu-option text-secondary-dark" onClick={() => onEdit(rowData)}>
                <div><IoPencilOutline /></div>
                <span>Editar</span>
            </div>
        </HasPermission>
        <HasPermission permission={Permissions.USERS_DELETE}>
            <div role="button" className="menu-option text-error" onClick={() => onDelete(rowData.id!)}>
                <div><IoTrashOutline /></div>
                <span>Eliminar</span>
            </div>
        </HasPermission>
    </>
);

export default UsersMenuOptions;
