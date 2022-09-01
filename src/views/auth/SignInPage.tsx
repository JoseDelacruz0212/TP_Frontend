import React, {FormEvent, useState} from "react";

import {IoSchool} from "react-icons/io5";

import {useAuthContext} from "../../contexts/AuthContext";

const SignInPage = () => {
    const { signIn } = useAuthContext();
    const appName = "My Title";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSignIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signIn(username, password);
    }

    return (
        <div className="min-h-screen p-10 flex">
            <div className="flex-1 hidden lg:block">

            </div>
            <div className="flex justify-center items-center w-full lg:w-96">
                <div className="flex flex-col space-y-10 shadow-md w-full p-3 sm:w-96">
                    <div className="flex justify-center items-center space-x-3">
                        <div><IoSchool size={30} /></div>
                        <h5>{appName}</h5>
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
                        </div>
                    </form>
                    <div>
                        <button type="submit" form="sign-in-form" className="button-primary w-full">
                            Iniciar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignInPage;
