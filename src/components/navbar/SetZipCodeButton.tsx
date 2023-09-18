import {Suspense, lazy, useState} from "react";
import {Modal, Typography, CircularProgress, Box} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// My import.
import type {Location} from "../../hooks/LocationContext.tsx"

// Our component.
const LocationFormModal = lazy(() => import("./ZipcodeFormModal.tsx"));

type Props = {
    location: Location;
    loadingNewZipcode: boolean;
    onZipcodeChange: (newZipcode: string) => void;
}

export default function SetZipCodeButton(props: Props) {
  const [open, setOpen] = useState(false);

  const handleOpenZipcodeForm = () => setOpen(true);
  const handleCloseZipcodeForm = () => setOpen(false);

  return (
    <div>
        <LoadingButton
            aria-label="zipcode"
            title="Change zipcode"
            type="button"
            onClick={handleOpenZipcodeForm}
            color="inherit"
            loading={props.loadingNewZipcode}
            loadingPosition="start"
            startIcon={<LocationOnIcon />}
        >
            <Typography fontSize="large">{props.location.zipcode}</Typography>
        </LoadingButton>
      <Modal open={open} onClose={handleCloseZipcodeForm} aria-labelledby="modal-modal-title">
        <Box display="flex" justifyContent="center" marginTop={7}>
          <Suspense fallback={<CircularProgress />}>
            <LocationFormModal onClose={handleCloseZipcodeForm} onZipcodeChange={props.onZipcodeChange} />
          </Suspense>
        </Box>
      </Modal>
    </div>
  );
}
