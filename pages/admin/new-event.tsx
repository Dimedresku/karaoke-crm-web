import {ReactElement} from 'react';
import styles from "../../styles/admin/NewEvent.module.scss";
import DashboardLayout from "../../layouts/dashboard/layout";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const NewEvent = () => {
    return (
        <div className={styles.new}>
            <div className={styles.newContainer}>
                <div className={styles.top}>
                    <h1>Add New Event</h1>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.left}>
                        <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" />
                    </div>
                    <div className={styles.right}>
                        <form>
                            <div className={styles.formInput}>
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className={styles.icon} />
                                </label>
                                <input type="file" id="file"  style={{display: "none"}} />
                            </div>
                            <div className={styles.formInput}>
                                <label>Name</label>
                                <input type="text" placeholder="new event" />
                            </div>
                            <div className={styles.formInput}>
                                <label>Description</label>
                                <input type="text" placeholder="new event description" />
                            </div>
                            <div className={styles.formInput}>
                                <label>Title</label>
                                <input type="text" placeholder="new event title" />
                            </div>
                            <button>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

NewEvent.getLayout = (page: ReactElement) => {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export default NewEvent;
