import React, {ReactElement} from 'react';

import style from "../../styles/admin/Admin.module.scss"
import List from "../../components/list/List";
import DashboardLayout from "../../layouts/dashboard/layout";
import {OverviewChart} from "../../components/overview-chart/OverviewChart";
import  {AuthJWTService } from "../../service/auth/authJWTService";
import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import Cookies from 'cookies'
import {Grid, Container, CardHeader, CardContent, Card} from "@mui/material";
import {OverviewTraffic} from "../../components/overview-traffic/OverviewTraffic"


const AdminPage = () => {
    return (
        <>
            <div className={style.widgets}>
            </div>
            <div className={style.charts}>
                <OverviewChart
                    sx={{ height: '100%', width: '100%', borderRadius: 5}} />
            </div>
                <Container maxWidth="xl" sx={{display: "flex"}}>
                    <Grid
                        xs={12}
                        md={6}
                        lg={4}
                        sx={{margin: 4}}
                    >
                        <OverviewTraffic
                            sx={{ height: '100%' }}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={6}
                        lg={8}
                        sx={{height: "100%", margin: "auto"}}
                    >
                        <Card sx={{margin: 1, height: '100%'}}>
                            <CardHeader title="Latest Reservations"/>
                            <CardContent>
                                <List />
                            </CardContent>
                        </Card>
                    </Grid>
                </Container>
        </>
    );
};

AdminPage.getLayout = (page: ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

type ServerSideProps = {
    req: NextApiRequest,
    res: NextApiResponse
}

export const getServerSideProps = async ({req, res}: ServerSideProps) => {
    const authService = AuthJWTService()
    const cookies = new Cookies(req, res)

    const redirectObject = {
        redirect: {
            destination: "/admin/login",
            permanent: false,
        }
    }

    const token = await authService.getAuthToken(cookies)
    if (!token) {
        return redirectObject
    }

    const user = await authService.getUser(token)

    return  {
        props: {
            profileUser: user
        }
    }

}

export default AdminPage;
