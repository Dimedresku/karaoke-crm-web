import React, {ReactElement} from 'react';
import styles from "../../styles/Events.module.scss"
import DashboardLayout from "../../layouts/dashboard/layout";
import DataTable from "../../components/datatable/DataTable";

const Events = () => {
    return (
        <div className={styles.events}>
            <DataTable />
        </div>
    );
};

Events.getLayout = (page: ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}


export default Events;
