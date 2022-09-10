import React from "react";

import ProfileImage from "../../profile/ProfileImage";

interface ProfileHeaderProps {
    title: string;
    username: string;
    userImage?: string;
    onProfileClicked: () => void;
}

const ProfileHeader = ({ title, username, userImage, onProfileClicked }: ProfileHeaderProps) => {
    return (
        <div className="p-2 flex justify-between items-center space-x-10">
            <h5 className="flex-1">{title}</h5>
            <div className="flex items-center space-x-5">
                <span className="subtitle hidden md:block w-52 text-right hover:underline" role="button" onClick={onProfileClicked}>{username}</span>
                <div role="button" className="w-10 h-10" onClick={onProfileClicked}>
                    <ProfileImage imageOption={userImage} />
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
