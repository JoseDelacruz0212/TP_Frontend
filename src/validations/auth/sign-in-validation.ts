import * as Yup from 'yup';

export interface SignInValidation {
    username?: string;
    password?: string
}

const validationSchema: Yup.SchemaOf<SignInValidation> = Yup.object().shape({
    username: Yup.string()
        .email("El formato del correo ingresado no es válido")
        .required("El campo email es requerido"),
    password: Yup.string()
        .required("El campo contraseña es requerido")
});

export default validationSchema;
