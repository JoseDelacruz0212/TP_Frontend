import React from "react";
import {useEditor} from "@craftjs/core";
import {IoRocketOutline, IoSaveOutline} from "react-icons/io5";

interface TopBarProps {
    onDesignSave: (design: string) => void;
    onDesignPublish: (design: string) => void;
    canSave?: boolean;
    canPublish?: boolean;
}

const TopBar = ({ onDesignSave, onDesignPublish, canSave = true, canPublish = true }: TopBarProps) => {
    const { query } = useEditor();

    const onDesignSaveHandler = () => onDesignSave(query.serialize());
    const onDesignPublishHandler = () => onDesignPublish(query.serialize());

    return (
        <div className="flex items-center justify-between">
            <span className="subtitle">Diseño</span>
            <div className="flex space-x-2">
                <button onClick={onDesignSaveHandler}
                        className="button-primary"
                        disabled={!canSave}>
                    <IoSaveOutline size={15} />
                </button>
                <button onClick={onDesignPublishHandler}
                        className="button-secondary"
                        disabled={!canPublish}>
                    Publicar
                </button>
            </div>
        </div>
    )
};

export default TopBar;
