import React, {useState} from "react";
import {IoCloseOutline} from "react-icons/io5";

import Modal from "../common/modal/Modal";

import ProfileImage from "./ProfileImage";
import ImageSelection from "./ImageSelection";

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

    const onImageSelectedSubmit = (selectedImage: string) => {
        onSelectedImageChange && onSelectedImageChange(selectedImage);
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
                <ImageSelection handleClose={() => setImageSelectionModalOpen(false)} onSubmit={onImageSelectedSubmit} />
            </Modal>
        </>
    );
};

export default Profile;
