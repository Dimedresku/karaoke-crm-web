import React from 'react';
import style from "./NavBar.module.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const NavBar = () => {
    return (
        <div className={style.navbar}>
            <div className={style.wrapper}>
                <div className={style.search}>
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon className={style.icon} />
                </div>
                <div className={style.items}>
                    <div className={style.item}>
                        <LanguageOutlinedIcon className={style.icon} />
                        English
                    </div>
                    <div className={style.item}>
                        <DarkModeOutlinedIcon className={style.icon} />
                    </div>
                    <div className={style.item}>
                        <FullscreenExitOutlinedIcon className={style.icon} />
                    </div>
                    <div className={style.item}>
                        <NotificationsNoneOutlinedIcon className={style.icon} />
                        <div className={style.counter}>1</div>
                    </div>
                    <div className={style.item}>
                        <ChatBubbleOutlineOutlinedIcon className={style.icon} />
                        <div className={style.counter}>2</div>
                    </div>
                    <div className={style.item}>
                        <ListOutlinedIcon className={style.icon} />
                    </div>
                    <div className={style.item}>
                        <img
                            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className={style.avatar}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
