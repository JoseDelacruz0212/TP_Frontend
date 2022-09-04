import React from "react";

import {IoPersonOutline} from "react-icons/io5";

import {ProfileHeaderProps} from "../../../types/components/layouts/application-layouts";

const ProfileHeader = ({ title, username, userImage, onProfileClicked }: ProfileHeaderProps) => {
    return (
        <div className="p-2 flex justify-between items-center space-x-10">
            <h5 className="flex-1">{title}</h5>
            <div className="flex items-center space-x-5">
                <span className="subtitle hidden md:block w-52 text-right hover:underline" role="button" onClick={onProfileClicked}>{username}</span>
                {
                    userImage ?
                        <img src={userImage} alt="profile" className="w-10 h-10 rounded-full" role="button" onClick={onProfileClicked} />
                        :
                        <IoPersonOutline className="border w-10 h-10 rounded-full p-2" role="button" onClick={onProfileClicked} />
                }
            </div>
        </div>
    );
};

export default ProfileHeader;
