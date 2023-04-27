import React from 'react';
import style from "./Sidebar.module.scss"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import BarChartIcon from '@mui/icons-material/BarChart';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import {Divider, Drawer, Stack} from "@mui/material";
import {Scrollbar} from "../Scrollbar";
import SideBarNavItem from "../../layouts/dashboard/SideBarNavItem";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    const content = (
        <Scrollbar
        sx={{
            height: '100%',
            '& .simplebar-content': {
                height: '100%'
            },
            '& .simplebar-scrollbar:before': {
                background: '#9DA4AE'
            }
        }}>
            <div className={style.sideBar}>
                <Stack>
                    <div className={style.top}>
                        <h1 className={style.logo}>LOGO</h1>
                    </div>
                    <Divider sx={{backgroundColor: "#2F3746"}}/>
                    <div className={style.center}>
                        <ul>
                            <SideBarNavItem
                                active={pathname == "/admin"}
                                text="Dashboard"
                                href="/admin"
                                icon={<BarChartIcon className={style.icon} />} />
                            <SideBarNavItem
                                active={pathname == "/admin/events"}
                                text="Events"
                                href="/admin/events"
                                icon={<StoreIcon className={style.icon} />} />
                            <SideBarNavItem
                                active={pathname == "/admin/reservations"}
                                text="Reservations"
                                href="/admin/reservations"
                                icon={<ReceiptLongOutlinedIcon className={style.icon} />} />
                            <SideBarNavItem
                                active={pathname == "/admin/menu-item"}
                                text="Menu Items"
                                href="/admin/menu-item"
                                icon={<RestaurantMenuOutlinedIcon className={style.icon} />} />
                            <SideBarNavItem
                                active={pathname == "/admin/users"}
                                text="Users"
                                href="/admin/users"
                                icon={<PersonOutlineIcon className={style.icon} />} />
                        </ul>
                    </div>
                    <Divider sx={{backgroundColor: "#2F3746"}}/>
                </Stack>
            </div>
        </Scrollbar>
    )

    return (
        <Drawer
            anchor="left"
            open
            PaperProps={{
                sx: {
                    backgroundColor: "#1C2536",
                    width: 280,
                    color: "white"
                }
            }}
            variant="permanent"
        >
            {content}
        </Drawer>
    );
};

export default Sidebar;
