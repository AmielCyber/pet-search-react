import type {FormEvent} from "react";
import {useRef, useState} from "react";
import {Button, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "24px",
    boxShadow: 24,
    p: 4,
};

const buttonGroupStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "4px",
    marginTop: "4px",
};

function getAdornmentIcon(isError: boolean) {
    return <InputAdornment position="end">{isError ? <ErrorIcon color="error"/> : <LocationOnIcon/>}</InputAdornment>;
}

const isValidZipcode = (zipcode: string): boolean => /\d{5}$/.test(zipcode);

type Props = {
    onClose: () => void;
    onZipcodeChange: (newZipcode: string) => void;
};

export default function ZipcodeFormModal(props: Props) {
    const [zipcodeError, setZipcodeError] = useState<string>();
    const zipcodeInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const enteredZipCode = zipcodeInputRef.current ? zipcodeInputRef.current.value : "";
        if (!isValidZipcode(enteredZipCode)) {
            setZipcodeError("Enter a valid 5 digit zipcode.")
            return;
        }
        props.onZipcodeChange(enteredZipCode);
        props.onClose();
    };

    const hasError = !!zipcodeError;
    const adornmentInputIcon = getAdornmentIcon(hasError);

    return (
        <Paper sx={style} variant="outlined">
            <form onSubmit={submitHandler} role="form">
                <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center" marginBottom="1rem">
                    New Zip Code
                </Typography>
                <TextField
                    id="filled-helperText"
                    label="Enter Zip Code"
                    variant="outlined"
                    autoFocus
                    type="text"
                    inputProps={{
                        inputMode: "numeric",
                        minLength: "5",
                        maxLength: "5",
                        autoComplete: "postal-code",
                    }}
                    InputProps={{
                        endAdornment: adornmentInputIcon,
                    }}
                    error={hasError}
                    inputRef={zipcodeInputRef}
                    helperText={zipcodeError ?? "Enter a 5 digit zip code."}
                    size="small"
                />
                <div style={buttonGroupStyle}>
                    <Button type="button" onClick={props.onClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" onSubmit={submitHandler} variant="outlined">
                        Submit
                    </Button>
                </div>
            </form>
        </Paper>
    );
}
