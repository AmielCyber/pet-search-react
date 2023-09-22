import {ReactNode} from "react";
import {Grid, Skeleton} from "@mui/material";

type Props = {
    itemsPerPage: number;
}
export default function PetLoadingList(props: Props) {
    const skeletonList = new Array<ReactNode>(props.itemsPerPage);
    for (let i = 0; i < skeletonList.length; i++) {
        skeletonList[i] = (
            <Grid item key={"grid-item-key-" + i}>
                <Skeleton variant="rectangular" animation="wave" width={300} height={300}/>
            </Grid>
        );
    }

    return <>{skeletonList}</>;
}