import React, {ReactFragment, useState} from 'react';
import Head from 'next/head';
import {
    Box,
    Button,
    FormHelperText,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { Layout as AuthLayout } from "../../layouts/auth/layout"
import { AuthJWTService } from "../../service/auth/authJWTService";
import {useRouter} from "next/router";

const Page = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authService = AuthJWTService()
    const router = useRouter()

    const handleSubmit = async () => {
        const token = await authService.login({username: username, password: password})
        if (token != undefined) {
            await router.push("/admin")
        }
    }

    return (
        <>
            <Head>
                <title>
                    Login | Devias Kit
                </title>
            </Head>
            <Box sx={{
                    backgroundColor: 'white',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <Box sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}>
                    <div>
                        <Stack
                            spacing={1}
                            sx={{ mb: 3 }}
                        >
                            <Typography variant="h4">
                                Login
                            </Typography>
                        </Stack>
                        <form
                            noValidate
                            onSubmit={() => {}}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    error={false}
                                    fullWidth
                                    helperText={''}
                                    label="Username"
                                    name="username"
                                    onBlur={() => {}}
                                    onChange={(e) => {setUsername(e.target.value)}}
                                    type="text"
                                />
                                <TextField
                                    error={false}
                                    fullWidth
                                    helperText={''}
                                    label="Password"
                                    name="password"
                                    onBlur={() => {}}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    type="password"
                                />
                            </Stack>
                            <Button
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 3,
                                    borderRadius: 3,
                                    backgroundColor: 'rgb(99, 102, 241)'
                                }}
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Continue
                            </Button>
                        </form>
                    </div>
                </Box>
            </Box>
        </>
    );
};

Page.getLayout = (page: ReactFragment) => (
    <AuthLayout>
        {page}
    </AuthLayout>
);

export default Page;
