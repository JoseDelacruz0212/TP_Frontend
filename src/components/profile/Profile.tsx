import React, {useState} from "react";
import {IoCloseOutline} from "react-icons/io5";

import Modal from "../common/modal/Modal";

import ProfileImage from "./ProfileImage";

interface ProfileProps {
    firstName: string;
    lastName: string;
    email: string;
    rol: string;
    image?: string;
    onSelectedImageChange?: (x: string) => void;
}

const Profile = ({ firstName, lastName, email, rol, image, onSelectedImageChange }: ProfileProps) => {
    const [imageSelectionModalOpen, setImageSelectionModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const onImageSelectedSubmit = () => {
        setImageSelectionModalOpen(false);
        onSelectedImageChange && onSelectedImageChange(selectedImage as string);
    }

    return (
        <>
            <div className="flex flex-col items-center md:justify-start md:flex-row md:items-start md:space-x-10">
                <div className="w-64 h-64">
                    <ProfileImage imageOption={image?.toString()} />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start flex-1 w-full">
                    <div className="md:order-2 self-center md:self-start pt-5 md:pt-0">
                        <button className="button-default md:pt-2" onClick={() => setImageSelectionModalOpen(true)}>
                            Editar imagen
                        </button>
                    </div>
                    <div className="pt-10 md:pt-2 flex flex-col space-y-5">
                        <div className="flex flex-col">
                            <span className="font-bold">Nombres:</span>
                            <span>{firstName}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Apellidos:</span>
                            <span>{lastName}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Correo electrónico:</span>
                            <span>{email}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Rol:</span>
                            <span>{rol}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal id="user-image-selection-modal"
                   isOpen={imageSelectionModalOpen}
                   handleClose={() => setImageSelectionModalOpen(false)}>
                <div className="flex flex-col space-y-10 p-4">
                    <div className="flex justify-between items-center">
                        <span className="subtitle">Seleccionar imagen de perfil</span>
                        <button onClick={() => setImageSelectionModalOpen(false)}>
                            <IoCloseOutline />
                        </button>
                    </div>
                    <form className="flex flex-col space-y-10">
                        <div className="grid grid-cols-6">
                            <div className="flex justify-center items-center">
                                <div tabIndex={0}
                                     className="h-12 w-12 rounded-full focus:border-2 border-primary-dark"
                                     onClick={() => setSelectedImage("1")}>
                                    <img src="/assets/female_avatar.svg" alt="profile" className="w-full h-full" />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div tabIndex={0}
                                     className="h-12 w-12 rounded-full focus:border-2 border-primary-dark"
                                     onClick={() => setSelectedImage("2")}>
                                    <img src="/assets/male_avatar.svg" alt="profile" className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" className="button-primary" onClick={() => onImageSelectedSubmit()}>
                                Actualizar
                            </button>
                            <button type="button" className="button-secondary" onClick={() => setImageSelectionModalOpen(false)}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default Profile;
