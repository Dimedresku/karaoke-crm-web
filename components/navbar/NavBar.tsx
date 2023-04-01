import React from 'react';
import style from "./NavBar.module.scss"
import { Avatar } from "@mui/material";
import { AccountPopover } from "../accountPopover/accountPopover";
import { usePopover } from "../../hooks/usePopover";
import {SystemUser} from "../../openaip";

type NavBarProps = {
    profileUser: SystemUser
}

const NavBar = ({profileUser}: NavBarProps) => {

    const accountPopover = usePopover();

    return (
        <div className={style.navbar}>
            <div className={style.wrapper}>
                <div className={style.items}>
                    <div className={style.item}>
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            sx={{
                                cursor: 'pointer',
                                height: 40,
                                width: 40
                            }}
                            src={`http://192.168.56.110:8080${profileUser?.avatar}`}
                        />
                    </div>
                </div>
            </div>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
                username={profileUser?.username}
            />
        </div>
    );
};

export default NavBar;
