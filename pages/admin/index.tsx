import React, {ReactElement} from 'react';

import style from  "../../styles/Admin.module.scss"
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import List from "../../components/list/List";
import DashboardLayout from "../../layouts/dashboard/layout";
import {threadId} from "worker_threads";

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
                <Featured />
                <Chart />
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

export default AdminPage;
