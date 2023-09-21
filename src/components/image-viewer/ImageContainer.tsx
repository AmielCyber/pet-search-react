import {useState} from "react";
import Paper from "@mui/material/Paper";

import type {PhotoSize} from "../../models/pet.ts";
import EmptyImage from "./EmptyImage.tsx";
import ImageNavigation from "./ImageNavigation.tsx";

import styles from "../../styles/image-container/ImageContainer.module.css";

type Props = {
    name: string;
    photos: PhotoSize[];
};

export default function ImageContainer(props: Props) {
    const [imgIndex, setImageIndex] = useState(0);

    if (props.photos.length === 0)
        return <EmptyImage/>;

    const hasPrev = imgIndex > 0;
    const hasNext = imgIndex < props.photos.length - 1;

    const handlePrevClick = () => hasPrev ?
        setImageIndex(imgIndex - 1) : setImageIndex(props.photos.length - 1);

    const handleNextClick = () => hasNext ? setImageIndex(imgIndex + 1) : setImageIndex(0);

    const handleDotNavigation = (index: number): void => setImageIndex(index);

    return (
        <Paper elevation={4}>
            <div className={styles.imageContainer}>
                <img src={props.photos[imgIndex].full} alt={props.name} sizes="500px"/>
                {props.photos.length > 1 && (
                    <ImageNavigation
                        totalImages={props.photos.length}
                        currentImageNumber={imgIndex}
                        onPrevious={handlePrevClick}
                        onNext={handleNextClick}
                        onNavImage={handleDotNavigation}
                    />
                )}
            </div>
        </Paper>
    );
}
