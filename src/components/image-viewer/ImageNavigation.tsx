import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import ImageNavigationPointerButton from "./ImageNavigationPointerButton.tsx";
import ImageNavigationButtonList from "./ImageNavigationButtonList.tsx";

import styles from "../../styles/image-container/ImageContainer.module.css";

type Props = {
    totalImages: number;
    currentImageNumber: number;
    onPrevious: () => void,
    onNext: () => void,
    onNavImage: (index: number) => void
}
export default function ImageNavigation(props: Props){
    return(
        <>
            <div className={styles.imgNavButtons}>
                <ImageNavigationPointerButton isNextImage={false} onClickNavigation={props.onPrevious}>
                    <ArrowCircleLeftOutlinedIcon fontSize="large"/>
                </ImageNavigationPointerButton>
                <ImageNavigationPointerButton isNextImage={true} onClickNavigation={props.onNext}>
                    <ArrowCircleRightOutlinedIcon fontSize="large"/>
                </ImageNavigationPointerButton>
            </div>
            <ImageNavigationButtonList
                totalImages={props.totalImages}
                currentImageNumber={props.currentImageNumber}
                onNavImage={props.onNavImage}
            />
        </>
    );
}