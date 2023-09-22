/**
 * @vitest-environment jsdom
 */
const useLocationMock = vi.hoisted(() => vi.fn(() => ({})));
vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal;
    return {
        ...mod,
        useLocation: useLocationMock,
        useNavigate: vi.fn(),
    }
})

import {afterEach, describe} from "vitest";
import {cleanup, render, screen } from "@testing-library/react";

import BackToSearchResultsButton from "./BackToSearchResultsButton.tsx";


describe(BackToSearchResultsButton.name, () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    })

    it("should display nothing if page did not came from pet search results.", () => {
        // Arrange
        useLocationMock.mockReturnValue({
            state: {}
        });
        const {container} = render(<BackToSearchResultsButton />)
        expect(container).toBeEmptyDOMElement();
    });
    it("should display back button if page came from pet search results.", () => {
        // Arrange
        useLocationMock.mockReturnValue({
            state: {
                fromSearch: true,
            }
        });
        render(<BackToSearchResultsButton />);
        expect(screen.getByRole("button")).toHaveTextContent(/back/i);
    });

});
