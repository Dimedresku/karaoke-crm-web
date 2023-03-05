import React from 'react';

import style from  "../../styles/Admin.module.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import NavBar from "../../components/navbar/NavBar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import List from "../../components/list/List";

const AdminPage = () => {
    return (
        <div className={style.adminPage}>
                <Sidebar />
                <div className={style.adminPageContainer}>
                    <NavBar />
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
                </div>
        </div>
    );
};

export default AdminPage;
