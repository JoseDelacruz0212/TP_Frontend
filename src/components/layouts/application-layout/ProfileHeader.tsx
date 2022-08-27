import React from "react";

import {IoPersonOutline} from "react-icons/io5";

interface ProfileHeaderProps {
    title: string;
    username: string;
    userImage?: string;
}

const ProfileHeader = ({ title, username, userImage }: ProfileHeaderProps) => {
    return (
        <div className="p-2 flex justify-between items-center space-x-10">
            <h5 className="flex-1">{title}</h5>
            <div className="flex items-center space-x-5">
                <span className="subtitle hidden md:block w-52 text-right hover:underline" role="button">{username}</span>
                {
                    userImage ?
                        <img src={userImage} alt="profile" className="bg-secondary w-10 h-10 rounded-full" role="button" />
                        :
                        <IoPersonOutline className="border w-10 h-10 rounded-full p-2" role="button" />
                }
            </div>
        </div>
    );
};

export default ProfileHeader;
