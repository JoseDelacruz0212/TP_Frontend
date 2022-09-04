import React, {useEffect, useState} from "react";

import {FormInputs} from "../../types/components/common/modal";
import {User} from "../../types/communication/responses/user";
import {InstitutionOption} from "../../types/communication/responses/institutions";
import InstitutionService from "../../services/InstitutionService";

const UserEditForm = ({ values, onChange }: FormInputs<User>) => {
    const [institutions, setInstitutions] = useState<InstitutionOption[]>([]);
    const [selectedInstitutionId, setSelectedInstitutionId] = useState<string | undefined>(values.institution?.id);
    const [selectedRole, setSelectedRole] = useState<string>((values.roles && values.roles[0]) || "");

    useEffect(() => {
        InstitutionService.getInstitutionsForCombo().then(
            values => setInstitutions(values)
        );
    }, []);

    const onSelectedRoleChanged = (option: string) => {
        onChange && onChange({ ...values, roles: [option] });
        setSelectedRole(option);
    };

    const onSelectedInstitutionIdHandler = (insitutionId: string) => {
        onChange && onChange({ ...values, insitutionId });
        setSelectedInstitutionId(insitutionId);
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
                <select className="form-input select"
                        id="edit-user-roles"
                        name="edit-user-roles"
                        placeholder="Rol"
                        value={selectedRole}
                        onChange={(e) => onSelectedRoleChanged(e.target.value)}>
                    <option value="">Seleccione una opción</option>
                    <option value="admin">Administrador</option>
                    <option value="institution">Institución</option>
                    <option value="teacher">Profesor</option>
                    <option value="user">Estudiante</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="edit-course-institution" className="form-label">
                    <small>Institución</small>
                </label>
                <select className="form-input select"
                        id="edit-course-institution"
                        name="edit-course-institution"
                        value={selectedInstitutionId || ""}
                        placeholder="Institución"
                        disabled={!institutions || institutions?.length === 0}
                        onChange={(e) => onSelectedInstitutionIdHandler(e.target.value)} >
                    <option value="" disabled>Seleccione una opción</option>
                    {
                        institutions && institutions.map(option => (
                            <option key={option.id} value={option.id}>
                                { option.name }
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
}

export default UserEditForm;
