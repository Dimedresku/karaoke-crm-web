import React, {ReactElement} from 'react';
import {ButtonBase, Box} from "@mui/material";
import Link from "next/link";

type SideBarNavItemProps = {
    active: boolean,
    text: string,
    href: string,
    icon: ReactElement | object
}

const SideBarNavItem = ({active, icon, text, href}: SideBarNavItemProps) => {
    return (
        <li>
            <ButtonBase
                sx={{
                    alignItems: 'center',
                    color: '#555',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '100%',
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                }}
            >
                <Box
                    component="span"
                    sx={{
                        alignItems: 'center',
                        color: '#9DA4AE',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        mr: 2,
                        ...(active && {
                            color: '#6366F1'
                        })
                    }}
                >
                    {icon}
                </Box>
                    <Link href={href} style={{color: (active ? 'white' : '#9DA4AE')}} >{text}</Link>
            </ButtonBase>
        </li>
    );
};

export default SideBarNavItem;
