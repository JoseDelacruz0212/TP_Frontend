import React, {useState} from "react";
import {IoCloseOutline, IoInformationCircle} from "react-icons/io5";
import Modal from "../common/modal/Modal";
import Accordion from "../common/accordion";

const BlockchainInformationHelper = ({ text }: { text: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const information = [
        {
            open: true,
            header: '¿Qué es Blockchain?',
            body: (
                <>
                    <span>De acuerdo a IBM:</span>
                    <blockquote className="my-5" cite="https://www.ibm.com/es-es/topics/what-is-blockchain">Blockchain es un libro mayor compartido e inmutable que facilita el proceso de registro de transacciones y de seguimiento de activos en una red de negocios. Un activo puede ser tangible (una casa, un auto, dinero en efectivo, terrenos) o intangible (propiedad intelectual, patentes, derechos de autor, marcas). Prácticamente cualquier cosa de valor puede ser rastreada y comercializada en una red de blockchain, reduciendo el riesgo y los costos para todos los involucrados.</blockquote>
                    <a className="text-blue-600 underline" href="https://www.ibm.com/es-es/topics/what-is-blockchain"><small>¿Qué es la tecnología de blockchain?</small></a>
                </>
            )
        },
        {
            header: '¿Para qué usa EduChain blockchain?',
            body: "El uso de la tecnología Blockchain nos permite ofrecer un sistema en el cuál el usuario que hace la consulta puede tener la seguridad de que las calificaciones mostradas son veridicas. Asimismo, permite manejar la trazabilidad de las notas obtenidas por los estudiantes en sus evaluaciones y tener la seguridad de que esta información no ha sido, ni será, modificada."
        },
        {
            header: '¿Cómo usa EduChain blockchain?',
            body: "Cada vez que un estudiante envía una evaluación, su calificación es almacenada en una base de datos perteneciente a EduChain. Adicionalmente, esta información es registrada en la red Blockchain para que se puedan realizar consultas cuando se requiera acceder a esta."
        },
        {
            header: '¿Qué información se almacena en la red blockchain de EduChain?',
            body: (
                <p className="text space-y-5">
                    <span>EduChain registra la siguiente información en la red Blockchain:</span>
                    <ul className="list-disc ml-5">
                        <li><strong>Usuario:</strong> EduChain almacena el identificador del estudiante al que le pertenece la calificación. Adicionalmente, se guarda el grado y la sección a la cual pertence el alumno. El nombre del estudiante no es un dato que se guarda en la red.</li>
                        <li><strong>Curso:</strong> La información relacionada al curso que se almacena en la red Blockchain de EduChain son el nombre y el identificador del curso.</li>
                        <li><strong>Evaluación:</strong> La información relacionada a la evaluación que se almacena en la red Blockchain de EduChain son el nombre, el identificador de la evaluación, el tiempo asignado por el profesor al momento de la creación del examen y la calificación obtenida por el estudiante.</li>
                        <li><strong>Otros datos:</strong> EduChain almacena información adicional en la red, tales como la fecha en la que se agregó o actualizó una calificación.</li>
                    </ul>
                    <div><small>* Los identificadores son valores generados automáticamente por el sistema web de EduChain.</small></div>
                </p>
            )
        }
    ]

    return (
        <div className="flex items-center space-x-2">
            <small>{ text }</small>
            <button className="text-secondary-dark">
                <IoInformationCircle onClick={() => setIsModalOpen(true)} />
            </button>
            <Modal id="blockchain-information-helper" isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col space-y-5 p-5">
                    <div className="flex justify-between">
                        <span className="subtitle">Información</span>
                        <button onClick={() => setIsModalOpen(false)}><IoCloseOutline size={20} /></button>
                    </div>
                    <div className="space-y-8">
                        {
                            information.map(info => (
                                <Accordion header={info.header} isOpen={info.open}>
                                    <p className="text-justify">
                                        {info.body}
                                    </p>
                                </Accordion>
                            ))
                        }
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="button-secondary" onClick={() => setIsModalOpen(false)}>
                            Regresar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default BlockchainInformationHelper;
