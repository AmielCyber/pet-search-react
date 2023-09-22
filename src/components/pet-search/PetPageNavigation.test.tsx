import PetPageNavigation from "./PetPageNavigation.tsx";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";

const onPageChangeMock = vi.fn();
describe(PetPageNavigation.name, () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    })

    it("should should be disabled when loading is true.", () => {
        render(<PetPageNavigation currentPage={1} totalPages={10} isLoading={true} onPageChange={onPageChangeMock}/>);
        fireEvent.click(screen.getByTestId("NavigateNextIcon"));
        expect(onPageChangeMock).not.toHaveBeenCalled();
    });
    it("should call onPageChange when loading is false and next button is clicked.", () => {
        render(<PetPageNavigation currentPage={1} totalPages={10} isLoading={false} onPageChange={onPageChangeMock}/>);
        fireEvent.click(screen.getByTestId("NavigateNextIcon"));
        expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    });
})