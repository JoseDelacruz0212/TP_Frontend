import React from "react";

import ProfileImage from "../../profile/ProfileImage";
import {IoShareSocialSharp} from "react-icons/io5";

interface ProfileHeaderProps {
    title: React.ReactNode;
    username: string;
    userImage?: string;
    onProfileClicked: () => void;
    onShareClicked: () => void;
}

const ProfileHeader = ({ title, username, userImage, onProfileClicked, onShareClicked }: ProfileHeaderProps) => {
    return (
        <div className="p-2 flex justify-between items-center space-x-10">
            <h5 className="flex-1">{title}</h5>
            <div className="flex items-center divide-x">
                <div className="flex mr-5">
                    <button className="hover:bg-gray-100 h-6 w-6 flex justify-center items-center rounded-full" onClick={onShareClicked}>
                        <IoShareSocialSharp />
                    </button>
                </div>
                <div className="flex items-center space-x-5">
                    <span className="subtitle hidden md:block text-right hover:underline ml-5" role="button" onClick={onProfileClicked}>{username}</span>
                    <div role="button" className="w-10 h-10" onClick={onProfileClicked}>
                        <ProfileImage imageOption={userImage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
