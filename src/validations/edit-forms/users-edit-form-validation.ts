import * as Yup from 'yup';

export interface UserValidation {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    insitutionId?: string;
}

export const updateValidationSchema: Yup.SchemaOf<UserValidation> = Yup.object().shape({
    name: Yup.string()
        .max(100, "El nombre debe contener 100 caracteres como máximo")
        .required("El campo nombre es requerido"),
    lastName: Yup.string()
        .max(100, "El apellido debe contener 100 caracteres como máximo")
        .required("El campo apellido es requerido"),
    email: Yup.string()
        .email("El formato del correo ingresado no es válido")
        .max(255, "El email debe contener 255 caracteres como máximo")
        .required("El campo email es requerido"),
    password: Yup.string()
        .max(50, "La contraseña debe contener 50 caracteres como máximo"),
    role: Yup.string()
        .required("El campo rol es requerido"),
    insitutionId: Yup.string()
        .required("El campo institución es requerido")
});

export const createValidationSchema: Yup.SchemaOf<UserValidation> = Yup.object().shape({
    name: Yup.string()
        .max(100, "El nombre debe contener 100 caracteres como máximo")
        .required("El campo nombre es requerido"),
    lastName: Yup.string()
        .max(100, "El apellido debe contener 100 caracteres como máximo")
        .required("El campo apellido es requerido"),
    email: Yup.string()
        .email("El formato del correo ingresado no es válido")
        .max(255, "El email debe contener 255 caracteres como máximo")
        .required("El campo email es requerido"),
    password: Yup.string()
        .max(50, "La contraseña debe contener 50 caracteres como máximo")
        .required("El campo contraseña es requerido"),
    role: Yup.string()
        .required("El campo rol es requerido"),
    insitutionId: Yup.string()
        .required("El campo institución es requerido")
});
