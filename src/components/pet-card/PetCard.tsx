import {useSWRConfig} from "swr";
import {Link} from "react-router-dom";
import {Card, CardActionArea, Grid, Link as MuiLink} from "@mui/material";

import type Pet from "../../models/pet.ts";
import {path} from "../../router/Routes.tsx";
import {PetCardImage} from "./PetCardImage.tsx";
import {PetCardBody} from "./PetCardBody.tsx";

const muiLinkStyle = {textDecoration: "none"};
const cardStyle = {maxWidth: "300px"};

type Props = {
    pet: Pet;
};
export default function PetCard(props: Props) {
    const {mutate} = useSWRConfig();

    const handleClick = async () => await mutate(`pets/${props.pet.id}`, props.pet);

    const petImgUrl = props.pet.primary_photo_cropped?.small ?? null;
    const petInfoUrl = `${path.pets}/${props.pet.id}`

    return (
        <Grid item key={props.pet.id}>
            <MuiLink
                component={Link}
                style={muiLinkStyle}
                to={petInfoUrl}
                state={{fromSearch: true}}
                preventScrollReset={false}
            >
                <CardActionArea onClick={handleClick}>
                    <Card sx={cardStyle} elevation={3}>
                        <PetCardImage
                            name={props.pet.name}
                            petImgUrl={petImgUrl}
                            petType={props.pet.type}
                        />
                        <PetCardBody
                            name={props.pet.name}
                            age={props.pet.age}
                            gender={props.pet.gender}
                            distance={props.pet.distance}
                        />
                    </Card>
                </CardActionArea>
            </MuiLink>
        </Grid>
    );
}

