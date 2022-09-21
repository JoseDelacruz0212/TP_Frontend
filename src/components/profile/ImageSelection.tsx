import React, {useState} from "react";
import {IoCloseOutline} from "react-icons/io5";

const ImageSelection = ({ handleClose, onSubmit }: any) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const onImageSelectedSubmit = () => {
        handleClose(false);
        selectedImage && onSubmit(selectedImage);
    }

    return (
        <div className="flex flex-col space-y-10 p-4">
            <div className="flex justify-between items-center">
                <span className="subtitle">Seleccionar imagen de perfil</span>
                <button onClick={() => handleClose()}>
                    <IoCloseOutline />
                </button>
            </div>
            <form className="flex flex-col space-y-10">
                <div className="grid grid-cols-6">
                    <div className="flex justify-center items-center">
                        <div tabIndex={0}
                             className={`h-12 w-12 rounded-full ${selectedImage === "1" ? 'border-2 border-primary-dark': ''}`}
                             onClick={() => setSelectedImage("1")}>
                            <img src="/assets/female_avatar.svg" alt="profile" className="w-full h-full" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div tabIndex={0}
                             className={`h-12 w-12 rounded-full ${selectedImage === "2" ? 'border-2 border-primary-dark': ''}`}
                             onClick={() => setSelectedImage("2")}>
                            <img src="/assets/male_avatar.svg" alt="profile" className="w-full h-full" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="button" className="button-primary" onClick={() => onImageSelectedSubmit()} disabled={!selectedImage}>
                        Actualizar
                    </button>
                    <button type="button" className="button-secondary" onClick={() => handleClose()}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
};

export default ImageSelection;
