import React, {useEffect, useState} from "react";

import ProfileComponent from '../../components/profile/Profile';

import UserService from "../../services/UserService";

import {User} from "../../types/communication/responses/user";

const Profile = () => {
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
       const getProfile = async () => {
           UserService.getCurrentProfile().then(
               userData => setUserData(userData)
           );
       }

       getProfile().then();
    }, []);

    const onSelectedImageChange = (image: string) => {
        const updatedUser = { ...userData, avatarUrl: image } as User;
        UserService.updateUserAvatar(userData?.idUser!, updatedUser).then();
    };

    return (
        <ProfileComponent firstName={userData?.name || ""}
                          lastName={userData?.lastName || ""}
                          email={userData?.email || ""}
                          rol={userData?.roles && userData.roles [0] || ""}
                          image={userData?.avatarUrl}
                          onSelectedImageChange={onSelectedImageChange} />
    )
};

export default Profile;
