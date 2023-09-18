import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";

export default function HomeLink() {
    return (
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <Button component={Link} to="/" color="inherit" startIcon={<PetsIcon/>}>
                Pet Search
            </Button>
        </Typography>
    );
}