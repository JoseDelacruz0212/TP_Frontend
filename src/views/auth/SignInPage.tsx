import React, {FormEvent, useMemo, useState} from "react";

import {IoSchool} from "react-icons/io5";

import {useAuthContext} from "../../contexts/AuthContext";

import {Link} from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import validationSchema from "../../validations/auth/sign-in-validation";

const SignInPage = () => {
    const { signIn, isLoggedIn, goToFirstAllowedView } = useAuthContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (isLoggedIn) goToFirstAllowedView();

    const onSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signIn(username, password);
    }

    const values = useMemo(() => ({ username, password }), [username, password]);
    const { isValid, errors } = useFormValidation(values, validationSchema);

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 hidden lg:block h-screen">
                <img className="h-screen opacity-60" src="/assets/login_image.jpg" alt="login" />
            </div>
            <div className="flex flex-col space-y-5 justify-center items-center w-full lg:w-96 mx-10">
                <div className="flex flex-col space-y-10 shadow-md w-full p-3 sm:w-96">
                    <div className="flex justify-center items-center space-x-3">
                        <div><IoSchool size={30} /></div>
                        <h5>{process.env.REACT_APP_SITE_NAME}</h5>
                    </div>
                    <form id="sign-in-form" className="flex flex-col space-y-5" onSubmit={onSignIn}>
                        <div className="form-group">
                            <label htmlFor="edit-institution-name" className="form-label">
                                Usuario
                            </label>
                            <input className="form-input"
                                   type="email"
                                   id="sign-in-username"
                                   name="sign-in-username"
                                   placeholder="Usuario"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)} />
                            <small className="form-error">{errors?.username}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-institution-name" className="form-label">
                                Contraseña
                            </label>
                            <input className="form-input"
                                   type="password"
                                   id="sign-in-password"
                                   name="sign-in-password"
                                   placeholder="Contraseña"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)} />
                            <small className="form-error">{errors?.password}</small>
                        </div>
                    </form>
                    <div>
                        <button type="submit" form="sign-in-form" className="button-primary w-full" disabled={!isValid}>
                            Iniciar sesión
                        </button>
                    </div>
                </div>
                <Link to="/verification-external">
                    <span className="text-primary-dark">Verificar calificaciones</span>
                </Link>
            </div>
        </div>
    )
};

export default SignInPage;
