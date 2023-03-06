import React, {ReactElement} from 'react';
import style from "./Layout.module.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/navbar/NavBar";

type LayoutProps = {
    children: ReactElement
}

const DashboardLayout = ({children}: LayoutProps) => {
    return (
            <div className={style.adminPage}>
                <Sidebar />
                <div className={style.adminPageContainer}>
                    <NavBar />
                    {children}
                </div>
            </div>
    );
};

export default DashboardLayout;
