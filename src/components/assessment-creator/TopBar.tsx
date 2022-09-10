import React from "react";
import {useEditor} from "@craftjs/core";
import {IoSaveOutline} from "react-icons/io5";

interface TopBarProps {
    onDesignSave: (design: string) => void;
}

const TopBar = ({ onDesignSave }: TopBarProps) => {
    const { query } = useEditor();

    const onDesignSaveHandler = () => onDesignSave(query.serialize());

    return (
        <div className="flex justify-between">
            <span className="subtitle">Diseño</span>
            <button onClick={onDesignSaveHandler} className="button-secondary text-on-secondary">
                <IoSaveOutline />
            </button>
        </div>
    )
};

export default TopBar;
