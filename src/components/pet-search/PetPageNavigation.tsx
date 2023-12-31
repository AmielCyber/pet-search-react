import {ChangeEvent} from "react";
import {Pagination, Stack, SxProps, Theme} from "@mui/material";

const paginationSx: SxProps<Theme> = {
    paddingTop: "2rem"
};

type Props = {
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    onPageChange: (_: ChangeEvent<unknown>, page: number) => void;
};
export default function PetPageNavigation(props: Props) {
    return (
        <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Pagination
                count={props.totalPages}
                page={props.currentPage}
                color="primary"
                showFirstButton
                onChange={props.onPageChange}
                disabled={props.isLoading}
                size="large"
                sx={paginationSx}
                variant="outlined"
            />
        </Stack>
    );
}
