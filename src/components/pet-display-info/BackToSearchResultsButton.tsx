import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackToSearchResultsButton(){
    const {state} = useLocation();
    const navigate = useNavigate();

    const pageFromPetSearch = !!state?.fromSearch;

    if(pageFromPetSearch){
        return (
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} size="large">
                Back to search results
            </Button>
        );
    }else{
        return null;
    }
}
