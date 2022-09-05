import React from "react";
import {IoPersonOutline} from "react-icons/io5";

const ProfileImage = ({ imageOption }: { imageOption?: string }) => {
    let image = "";

    switch (parseInt(imageOption || "0")) {
        case 1: image = "/assets/female_avatar.svg"; break;
        case 2: image = "/assets/male_avatar.svg"; break;
        default:
            image = ""; break;
    }

    return (
        <>
            {
                image ?
                    <img src={image} alt="profile" className="w-full h-full" /> :
                    <div role="img" className="w-full h-full border">
                        <IoPersonOutline className="w-full h-full " />
                    </div>
            }
        </>
    )
};

export default ProfileImage;
