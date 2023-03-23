import React, {ReactElement} from 'react';

import style from "../../styles/admin/Admin.module.scss"
import Widget from "../../components/widget/Widget";
import List from "../../components/list/List";
import DashboardLayout from "../../layouts/dashboard/layout";
import {OverviewSales} from "../../components/overview-chart/OverviewChart";
import  {AuthJWTService } from "../../service/auth/authJWTService";
import { NextApiRequest, NextApiResponse } from "next";

const AdminPage = () => {
    return (
        <>
            <div className={style.widgets}>
                <Widget type="user"/>
                <Widget type="order"/>
                <Widget type="earning" />
                <Widget type="balance" />
            </div>
            <div className={style.charts}>
                <OverviewSales
                    chartSeries={[
                        {
                            name: 'This year',
                            data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                        },
                        {
                            name: 'Last year',
                            data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                        }
                    ]}
                    sx={{ height: '100%', width: '100%', borderRadius: 5, padding: 2 }} />
            </div>
            <div className={style.listContainer}>
                <div className={style.listTitle}>Latest Transactions</div>
                <List />
            </div>
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
    const redirectObject = {
        redirect: {
            destination: "/admin/login",
            permanent: false,
        }
    }

    const isAuth = await authService.isAuthUser(req, res)
    if (!isAuth) {
        return redirectObject
    }

    return  {
        props: {}
    }

}

export default AdminPage;
