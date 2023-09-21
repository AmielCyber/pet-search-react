import Paper from "@mui/material/Paper";
import HideImageTwoToneIcon from "@mui/icons-material/HideImageTwoTone";

import styles from "../../styles/image-container/ImageContainer.module.css";

export default function EmptyImage(){
    return (
        <Paper elevation={4}>
            <div className={styles.blankImage} aria-label="empty image">
                <HideImageTwoToneIcon fontSize="large" color="primary"/>
            </div>
        </Paper>
    );
}