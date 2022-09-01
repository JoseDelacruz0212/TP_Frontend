import React, {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import { IoSchool } from "react-icons/io5";

import NavMenu from "../../components/layouts/application-layout/NavMenu";
import Header from "../../components/layouts/application-layout/Header";
import ProfileHeader from "../../components/layouts/application-layout/ProfileHeader";

import items from "../../config/app/menu-options";
import {getActiveOptionForCurrentLocation, getTitleForCurrentLocation} from "../../config/app/routes";

const ApplicationLayout = () => {
    const appName = "My Title";
    const username = "Rodrigo Silva";

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [activeOption, setActiveOption] = useState(getActiveOptionForCurrentLocation(pathname));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setActiveOption(getActiveOptionForCurrentLocation(pathname));
    }, [pathname]);

    const onOptionSelected = (newOption: number) => {
        setActiveOption(newOption);
        setIsMenuOpen(!isMenuOpen);
    }

    const onProfileClicked = () => navigate('profile');

    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
            <aside className={`bg-primary text-on-primary fixed top-0 h-14 lg:h-screen lg:pt-5 w-full lg:w-60 ${isMenuOpen ? 'h-screen' : ''}`}>
                <Header titleIcon={<IoSchool size="30" />}
                        title={appName}
                        isMenuOpen={isMenuOpen}
                        toggleOpen={() => setIsMenuOpen(!isMenuOpen)} />
                <span className="lg:hidden">{ isMenuOpen && <NavMenu items={items} selected={activeOption} onOptionSelected={onOptionSelected} /> }</span>
                <span className="hidden lg:block">{ <NavMenu items={items} selected={activeOption} onOptionSelected={onOptionSelected} /> }</span>
            </aside>
            <main className="bg-background flex-1 flex flex-col pt-14 lg:pl-60 lg:pt-0">
                <div className="py-5 px-4 sm:px-10 min-h-full flex flex-col">
                    <ProfileHeader title={getTitleForCurrentLocation(pathname)} username={username} onProfileClicked={onProfileClicked} />
                    <div className="px-2 py-10 pb-0 flex-1">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>

    )
}

export default ApplicationLayout;
