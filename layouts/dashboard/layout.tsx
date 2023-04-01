import React, {ReactElement} from 'react';
import style from "./Layout.module.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/navbar/NavBar";

type LayoutProps = {
    children: ReactElement
}

const DashboardLayout = ({children}: LayoutProps) => {
    const {profileUser} = children.props
    return (
            <div className={style.adminPage}>
                <Sidebar />
                <div className={style.adminPageContainer}>
                    <NavBar profileUser={profileUser} />
                    {children}
                </div>
            </div>
    );
};

export default DashboardLayout;
