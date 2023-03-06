import React from 'react';
import style from "./Sidebar.module.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Link from 'next/link'

const Sidebar = () => {
    return (
        <div className={style.sideBar}>
            <div className={style.top}>
                <h1 className={style.logo}>LOGO</h1>
            </div>
            <hr />
            <div className={style.center}>
                <ul>
                    <p className={style.title}>Main</p>
                    <li>
                        <DashboardIcon className={style.icon} />
                        <Link href="/admin" replace={true}><span>Dashboard</span></Link>
                    </li>
                    <p className={style.title}>Lists</p>
                    <li>
                        <PersonOutlineIcon className={style.icon} />
                        <span>Users</span>
                    </li>
                    <li>
                        <StoreIcon className={style.icon} />
                        <Link href="/admin/events" replace={true}><span>Events</span></Link>
                    </li>
                    <li>
                        <CreditCardIcon className={style.icon} />
                        <span>Orders</span>
                    </li>
                    <p className={style.title}>Useful</p>
                    <li>
                        <InsertChartIcon className={style.icon} />
                        <span>Stats</span>
                    </li>
                    <li>
                        <LocalShippingIcon className={style.icon} />
                        <span>Delivery</span>
                    </li>
                    <li>
                        <NotificationsNoneIcon className={style.icon} />
                        <span>Notifications</span>
                    </li>
                    <p className={style.title}>SERVICE</p>
                    <li>
                        <SettingsSystemDaydreamOutlinedIcon className={style.icon} />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className={style.icon} />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className={style.icon} />
                        <span>Settings</span>
                    </li>
                    <p className={style.title}>USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className={style.icon} />
                        <span>Profile</span>
                    </li>
                    <li>
                        <ExitToAppIcon className={style.icon} />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className={style.bottom}>
                <div className={style.colorOption}></div>
                <div className={style.colorOption}></div>
            </div>
        </div>
    );
};

export default Sidebar;
