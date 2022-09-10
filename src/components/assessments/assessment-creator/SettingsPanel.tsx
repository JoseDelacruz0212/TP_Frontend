import React from "react";
import {useEditor} from "@craftjs/core";
import {IoTrashOutline} from "react-icons/io5";

const SettingsPanel = () => {
    const { actions, selected } = useEditor((state, query) => {
        // @ts-ignore
        const [currentNodeId] = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable()
            };
        }

        return { selected };
    });

    return selected ? (
        <div className="rounded-md shadow-md p-2 flex flex-col space-y-5">
            <div className="flex justify-between">
                <span className="subtitle">Configuración</span>
                {
                    selected.isDeletable &&
                    <button className="button-error text-on-error p-2" onClick={() => actions.delete(selected.id)}>
                        <IoTrashOutline />
                    </button>
                }
            </div>
            {
                selected.settings && React.createElement(selected.settings)
            }
            {
                selected.isDeletable ? (
                    <button className="button-primary w-full" onClick={() => actions.delete(selected.id)}>
                        Eliminar
                    </button>
                ) : null
            }
        </div>
    ) : null
};

export default SettingsPanel;
