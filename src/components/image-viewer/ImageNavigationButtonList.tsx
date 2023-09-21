import type {ReactNode} from "react";

import ImageNavigationButton from "./ImageNavigationButton.tsx";

import styles from "../../styles/image-container/ImageNavDots.module.css";

type Props = {
    totalImages: number;
    currentImageNumber: number;
    onNavImage: (index: number) => void;
};

export default function ImageNavigationButtonList(props: Props) {
    return (
        <div className={styles.navDots}>
            <menu>
                {getNavigationCircleList(props)}
            </menu>
        </div>
    );
}

function getNavigationCircleList(props: Props): Array<ReactNode> {
    const list = Array<React.ReactNode>(props.totalImages);
    for (let index = 0; index < list.length; index++)
        list[index] = (
            <ImageNavigationButton
                key={index}
                isCurrentImage={index === props.currentImageNumber}
                imageNumber={index}
                onNavigateImage={props.onNavImage}
            />
        );

    return list;
}