import PetSearchPage from "./PetSearchPage.tsx";
import {cleanup, render, screen} from "@testing-library/react";
import {path} from "../router/Routes.tsx";
import {LocationProvider} from "../hooks/LocationContext.tsx";
import {createMemoryRouter, RouterProvider} from "react-router-dom";

const usePetSearchParamsMock = vi.hoisted(() => vi.fn());
vi.mock("../hooks/usePetSearchParams.ts", async (importOriginal) => {
    const mod = await importOriginal() as object;
    return{
        ...mod,
        default: usePetSearchParamsMock,
    }
});
describe(PetSearchPage.name, () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it("should display error if search params is invalid.", () => {
        const expectedErrorMessage = "failed";
        usePetSearchParamsMock.mockReturnValue({
            locationName: "",
            searchParams: null,
            errorMessage: expectedErrorMessage,
        })
        const routes = [
            {
                path: `${path.search}/:petType`,
                element: (
                    <LocationProvider>
                        <PetSearchPage/>
                    </LocationProvider>
                ),
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: [`${path.search}/:petType`],
            initialIndex: 0,
        });
        render(<RouterProvider router={router}/>);
        expect(screen.getByText(expectedErrorMessage)).toBeInTheDocument();
    });
})