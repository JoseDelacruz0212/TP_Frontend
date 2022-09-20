import React, {useCallback, useMemo, useState} from "react";

import {User} from "../../types/communication/responses/user";
import {FormInputProps, Option} from "../../types/common";
import {Permissions} from "../../types/auth";

import HasPermission from "../../hoc/with-permission/HasPermission";

import InstitutionsSelect from "../selects/InstitutionsSelect";
import {useAuthContext} from "../../contexts/AuthContext";
import useSelect from "../../hooks/useSelect";
import Select from "react-select";

const getValue = (option: Option) => option.value as string;
const getLabel = (option: Option) => option.label as string;

const UserEditForm = ({ values, onChange }: FormInputProps<User>) => {
    const { hasPermissionFor } = useAuthContext();

    const options = [
        ...(hasPermissionFor(Permissions.USERS_ADD_ADMINISTRATOR) ? [{ value: 'admin', label: 'Administrador' }] : []),
        ...(hasPermissionFor(Permissions.USERS_ADD_INSTITUTION) ? [{ value: 'institution', label: 'Institución' }] : []),
        { value: 'teacher', label: 'Profesor' },
        { value: 'user', label: 'Estudiante' }
    ];

    const onSelectedRoleChanged = (option?: string) => {
         option && onChange && onChange({ ...values, roles: [option] });
    };

    const defaultValue = (values.roles && values.roles[0]) || "";

    const selectProps = useSelect(getValue, getLabel, onSelectedRoleChanged, options, defaultValue);

    const onInstitutionChanged = (insitutionId?: string) => {
         onChange && onChange({ ...values, insitutionId });
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor="edit-user-name" className="form-label">
                    <div className="flex justify-between">
                        <small>Nombre</small>
                        <small className="text-overline">{values.name.length || '0'} / 100</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-user-name"
                       name="edit-user-name"
                       placeholder="Nombre"
                       maxLength={100}
                       value={values.name}
                       onChange={(e) => onChange && onChange({ ...values, name: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-user-lastname" className="form-label">
                    <div className="flex justify-between">
                        <small>Apellido</small>
                        <small className="text-overline">{values.name.length || '0'} / 100</small>
                    </div>
                </label>
                <input className="form-input"
                       id="edit-user-lastname"
                       name="edit-user-lastname"
                       placeholder="Apellido"
                       maxLength={100}
                       value={values.lastName}
                       onChange={(e) => onChange && onChange({ ...values, lastName: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-user-email" className="form-label">
                    <div className="flex justify-between">
                        <small>Correo electrónico</small>
                        <small className="text-overline">{values.name.length || '0'} / 255</small>
                    </div>
                </label>
                <input className="form-input"
                       type="email"
                       id="edit-user-email"
                       name="edit-user-email"
                       placeholder="Correo electrónico"
                       maxLength={255}
                       value={values.email}
                       onChange={(e) => onChange && onChange({ ...values, email: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-user-password" className="form-label">
                    <div className="flex justify-between">
                        <small>Contraseña</small>
                        <small className="text-overline">{values.name.length || '0'} / 50</small>
                    </div>
                </label>
                <input className="form-input"
                       type="password"
                       id="edit-user-password"
                       name="edit-user-password"
                       placeholder="Contraseña"
                       maxLength={50}
                       value={values.password}
                       onChange={(e) => onChange && onChange({ ...values, password: e.target.value })} />
            </div>
            <div className="form-group">
                <label htmlFor="edit-user-roles" className="form-label">
                    <small>Rol</small>
                </label>
                <Select {...selectProps}
                        id="edit-course-institution"
                        name="edit-course-institution"
                        placeholder="Rol" />
            </div>
            <HasPermission permission={Permissions.USERS_SELECT_INSTITUTION}>
                <InstitutionsSelect institutionId={values.institution?.id || ""} onInstitutionChanged={onInstitutionChanged} />
            </HasPermission>
        </>
    );
}

export default UserEditForm;
