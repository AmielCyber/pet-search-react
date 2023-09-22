import styles from "../../styles/cards/PetListCard.module.css";

import CatIcon from "../icons/CatIcon.tsx";
import DogIcon from "../icons/DogIcon.tsx";

const petIconsStyles = {
    fontSize: "300px",
    color: "primary",
};

type Props = {
    petImgUrl: string | null,
    petType: "Dog" | "Cat",
    name: string
}
export function PetCardImage(props: Props) {
    if(props.petImgUrl){
        return (
            <div className={styles.imageContainer}>
                <img src={props.petImgUrl} alt={props.name} loading="lazy" decoding="async"/>
            </div>
        );
    }
    return <PetIcon petType={props.petType} />;
}

type PetIconProps = {
    petType: "Cat" | "Dog";
}
function PetIcon(props: PetIconProps){
    if(props.petType === "Cat")
        return <CatIcon sx={petIconsStyles}/>;

    return <DogIcon sx={petIconsStyles}/>;
}