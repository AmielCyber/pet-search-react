import Pet from "../../models/pet.ts";
import PetCard from "../pet-card/PetCard.tsx";

type Props = {
    petData: Pet[]
}
export default function PetList(props: Props) {
    return <> {props.petData.map((pet) => <PetCard key={pet.id} pet={pet}/>)} </>;
}