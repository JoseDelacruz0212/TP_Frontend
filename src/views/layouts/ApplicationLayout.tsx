import React, {useEffect, useState} from "react";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import { IoSchool } from "react-icons/io5";
import copy from "copy-to-clipboard";

import NavMenu from "../../components/layouts/application-layout/NavMenu";
import Header from "../../components/layouts/application-layout/Header";
import ProfileHeader from "../../components/layouts/application-layout/ProfileHeader";

import {useAuthContext} from "../../contexts/AuthContext";

import items from "../../config/app/menu-options";
import {getActiveOptionForCurrentLocation, getTitleForCurrentLocation} from "../../config/app/routes";
import {toast} from "react-toastify";

const ApplicationLayout = () => {
    const { signOut, isLoggedIn, hasPermissionFor, getUserName, getUserImage, getUserId } = useAuthContext();

    const { pathname, state } = useLocation();
    const navigate = useNavigate();
    const [activeOption, setActiveOption] = useState(getActiveOptionForCurrentLocation(pathname));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setActiveOption(getActiveOptionForCurrentLocation(pathname));
    }, [pathname]);

    const onOptionSelected = (newOption: number) => {
        const existingOption = items.find(x => x.key === newOption);

        if (!existingOption || (existingOption && existingOption.type === 'link')) {
            setActiveOption(existingOption);
            setIsMenuOpen(!isMenuOpen);
        }

        if (existingOption && existingOption.type === 'logout') {
            signOut();
        }
    }

    const onProfileClicked = () => navigate('profile');

    const onShareClicked = () => {
        copy(`${process.env.REACT_APP_URL}/verification-external/${getUserId()}`);
        toast.success("Enlace copiado al portapapeles");
    };

    if (!isLoggedIn) return <Navigate to="/" />

    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
            <aside className={`bg-primary text-on-primary fixed top-0 h-14 ${isMenuOpen ? 'h-screen' : ''} lg:h-screen lg:pt-5 w-full lg:w-52 z-10`}>
                <Header titleIcon={<IoSchool size="30" />}
                        title={process.env.REACT_APP_SITE_NAME as string}
                        isMenuOpen={isMenuOpen}
                        toggleOpen={() => setIsMenuOpen(!isMenuOpen)} />
                <div className="lg:hidden">
                    {
                        isMenuOpen &&
                        <NavMenu items={items.filter(x => hasPermissionFor(x.permission))}
                                 selected={activeOption?.key}
                                 onOptionSelected={onOptionSelected} />
                    }
                </div>
                <div className="hidden lg:block">{ <NavMenu items={items.filter(x => hasPermissionFor(x.permission))} selected={activeOption?.key} onOptionSelected={onOptionSelected} /> }</div>
            </aside>
            <main className="bg-background flex-1 w-full flex flex-col pt-14 lg:pl-52 lg:pt-0">
                <div className="py-5 px-4 sm:px-10 min-h-full flex-1 flex flex-col">
                    <ProfileHeader title={getTitleForCurrentLocation(pathname, state)}
                                   username={getUserName()}
                                   userImage={getUserImage()}
                                   onProfileClicked={onProfileClicked}
                                   onShareClicked={onShareClicked} />
                    <div className="px-2 py-10 pb-0 flex-1 flex flex-col">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>

    )
}

export default ApplicationLayout;
