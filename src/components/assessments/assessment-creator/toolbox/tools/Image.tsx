import React from "react";
import {useNode} from "@craftjs/core";
import {
    IoArrowBackCircleOutline,
    IoArrowDownCircleOutline,
    IoArrowForwardCircleOutline,
    IoTabletLandscapeOutline
} from "react-icons/io5";
import Dropzone from "react-dropzone";

interface ImageProps {
    width?: number | string;
    height?: number | string;
    alignment?: number;
    src?: string;
    base64scr?: string;
}

const Image = ({ width, height, alignment, src }: ImageProps) => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <div className={`px-2 py-4 overflow-hidden flex justify-${alignment === 3 ? 'end' : (alignment === 2 ? 'center' : 'start')}`}>
            <div ref={ref => connect(drag(ref!))} style={{
                width,
                height
            }}>
                {
                    src ?
                        <img className="w-full h-full" src={src} alt="question" />
                        :
                        <div className="border w-full h-full flex items-center justify-center p-5">
                            <small className="text-center">Haga click aquí para editar la imagen</small>
                        </div>
                }
            </div>
        </div>
    )
};

const ImageSettings = () => {
    const { width, height, actions: { setProp } } = useNode(node => ({
        width: node.data.props.width,
        height: node.data.props.height,
        alignment: node.data.props.alignment,
    }));

    return (
        <div className="flex flex-col space-y-5">
            <div className="form-group-row">
                <label htmlFor="image-width" className="form-label">
                    <small>Alineación:</small>
                </label>
                <div className="flex space-x-2">
                    <button onClick={(e) => setProp((props: ImageProps) => props.alignment = 1)}
                            className="rounded-md border shadow-md p-2 flex justify-center items-center">
                        <IoArrowBackCircleOutline />
                    </button>
                    <button onClick={(e) => setProp((props: ImageProps) => props.alignment = 2)}
                            className="rounded-md border shadow-md p-2 flex justify-center items-center">
                        <IoArrowDownCircleOutline />
                    </button>
                    <button onClick={(e) => setProp((props: ImageProps) => props.alignment = 3)}
                            className="rounded-md border shadow-md p-2 flex justify-center items-center">
                        <IoArrowForwardCircleOutline />
                    </button>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="image-width" className="form-label">
                    <small>Ancho</small>
                </label>
                <div className="flex space-x-2">
                    <input type="number"
                           className="form-input flex-1"
                           id="image-width"
                           name="image-width"
                           min={0}
                           placeholder="Ancho"
                           value={width || ""}
                           onChange={(e) => setProp((props: ImageProps) => props.width = parseInt(e.target.value || "0"))} />
                    <button onClick={(e) => setProp((props: ImageProps) => props.width = '100%')}
                            className="rounded-md border shadow-md p-2 flex justify-center items-center">
                        <IoTabletLandscapeOutline />
                    </button>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="image-height" className="form-label">
                    <small>Alto</small>
                </label>
                <input type="number"
                       className="form-input"
                       id="image-height"
                       name="image-height"
                       min={0}
                       placeholder="Alto"
                       value={height || ""}
                       onChange={(e) => setProp((props: ImageProps) => props.height = parseInt(e.target.value || "0"))} />
            </div>
            <div>
                <Dropzone onDrop={acceptedFiles => {
                    acceptedFiles.forEach((file) => {
                        const reader = new FileReader();

                        reader.readAsDataURL(file);

                        reader.onload = () => {
                            setProp((props: ImageProps) => props.src = URL.createObjectURL(file));
                            setProp((props: ImageProps) => props.base64scr = reader.result as string);
                        };

                    });
                }} maxFiles={1} accept={{
                    'image/*': ['.jpeg', '.png']
                }}>
                    {
                        ({ getRootProps, getInputProps, isFocused, isDragAccept, isDragReject }) => (
                            <section>
                                <div {...getRootProps({
                                    style: {
                                        ...baseStyle,
                                        ...(isFocused ? focusedStyle : {}),
                                        ...(isDragAccept ? acceptStyle : {}),
                                        ...(isDragReject ? rejectStyle : {})
                                    }
                                })}>
                                    <input {...getInputProps()} />
                                    <p>Arrestre archivos aquí o haga click para seleccionarlos</p>
                                </div>
                            </section>
                        )
                    }
                </Dropzone>
            </div>
        </div>
    );
};

const baseStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

Image.craft = {
    props: {
        width: 200,
        height: 200
    },
    related: {
        settings: ImageSettings
    }
};

export default Image;
