import React from "react";
import {useEditor} from "@craftjs/core";
import {IoRocketOutline, IoSaveOutline} from "react-icons/io5";

interface TopBarProps {
    onDesignSave: (design: string) => void;
    onDesignPublish: (design: string) => void;
}

const TopBar = ({ onDesignSave, onDesignPublish }: TopBarProps) => {
    const { query } = useEditor();

    const onDesignSaveHandler = () => onDesignSave(query.serialize());
    const onDesignPublishHandler = () => onDesignPublish(query.serialize());

    return (
        <div className="flex justify-between">
            <span className="subtitle">Diseño</span>
            <div className="flex space-x-2">
                <button onClick={onDesignPublishHandler} className="button-secondary text-on-secondary p-2">
                    <IoRocketOutline />
                </button>
                <button onClick={onDesignSaveHandler} className="button-primary text-on-primary p-2">
                    <IoSaveOutline />
                </button>
            </div>
        </div>
    )
};

export default TopBar;
