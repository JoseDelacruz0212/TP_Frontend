import React from "react";
import {Link, Outlet} from "react-router-dom";
import {IoEnterOutline, IoSchool} from "react-icons/io5";

import {APP_NAME} from "../../config/app/basic-settings";

const Externalayout = () => {
    return (
        <div className="flex flex-col min-h-screen lg:flex-row">
            <aside className={`bg-primary text-on-primary fixed top-0 h-14 w-full`}>
                <header className="flex justify-between items-center p-2 px-6 sm:px-12">
                    <div className="flex justify-center items-center space-x-3">
                        <IoSchool size="30" />
                        <h5>{APP_NAME}</h5>
                    </div>
                    <Link to="/">
                        <IoEnterOutline size={30} className="md:hidden" />
                        <button className="hidden md:block">Acceder</button>
                    </Link>
                </header>
            </aside>
            <main className="bg-background flex-1 w-full flex flex-col pt-14">
                <div className="py-5 px-4 sm:px-10 min-h-full flex flex-col">
                    <div className="px-2 py-10 pb-0 flex-1">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Externalayout;
