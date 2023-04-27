import React from 'react';
import styles from "./Featured.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {KeyboardArrowUp} from "@mui/icons-material";

const Featured = () => {
    return (
        <div className={styles.featured}>
            <div className={styles.top}>
                <h1 className={styles.title}>Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className={styles.bottom}>
                <div className={styles.featuredChart}>
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
                </div>
                <p className={styles.title}>Total sales made today</p>
                <p className={styles.amount}>$420</p>
                <p className={styles.description}>
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className={styles.summary}>
                    <div className={styles.items}>
                        <div className={styles.itemTitle}>Target</div>
                        <div className={`${styles.itemResult} ${styles.negative}`}>
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div className={styles.resultAmount}>$12.4k</div>
                        </div>
                    </div>
                    <div className={styles.items}>
                        <div className={styles.itemTitle}>Last Week</div>
                        <div className={`${styles.itemResult} ${styles.negative}`}>
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div className={styles.resultAmount}>$12.4k</div>
                        </div>
                    </div>
                    <div className={styles.items}>
                        <div className={styles.itemTitle}>Last Month</div>
                        <div className={`${styles.itemResult} ${styles.positive}`}>
                            <KeyboardArrowUp fontSize="small" />
                            <div className={styles.resultAmount}>$12.4k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
