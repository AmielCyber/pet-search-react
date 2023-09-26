import DisplaySearch from "./DisplaySearch.tsx";
import {cleanup, render, screen} from "@testing-library/react";

const usePetListMock = vi.hoisted(() => vi.fn());
vi.mock("../../hooks/usePetList", async (importOriginal) => {
    const mod = await importOriginal() as object;
    return {
        ...mod,
        default: usePetListMock,
    }
});
describe(DisplaySearch.name, () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });
    it("should display 'failed' if usePetList returns an error.", () => {
        usePetListMock.mockReturnValue({
            petListData: undefined,
            error: new Error("error"),
            isLoading: false,
            currentPage: 1,
            totalPages: 10,
            itemsPerPage: 10,
        })
        render(
            <DisplaySearch
                locationName={"92101"}
                searchParams={new URLSearchParams({type: "dog"})}
                searchQueryURL={""}
                onPageChange={vi.fn()}
                onQueryChange={vi.fn()}/>
        );
        expect(screen.getByText(/failed/i)).toBeInTheDocument();
    })
});