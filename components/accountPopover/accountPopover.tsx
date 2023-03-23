import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import {AuthJWTService} from "../../service/auth/authJWTService";

type propTypes = {
    anchorEl: any,
    onClose: Function,
    open: boolean
};


export const AccountPopover = (props: propTypes) => {
    const { anchorEl, onClose, open } = props;
    const router = useRouter();
    const auth = AuthJWTService();

    const handleSignOut = useCallback(
        () => {
            onClose?.();
            auth.logout();
            router.push("/admin/login");
        },
        [onClose, auth, router]
    );

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={onClose}
            open={open}
            PaperProps={{ sx: { width: 200 } }}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant="overline">
                    Account
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    Anika Visser
                </Typography>
            </Box>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1
                    }
                }}
            >
                <MenuItem onClick={handleSignOut}>
                    Sign out
                </MenuItem>
            </MenuList>
        </Popover>
    );
};

