/**
 * @vitest-environment jsdom
 */
const useParamsMock = vi.hoisted(() => vi.fn());
vi.mock("react-router-dom", async (importOriginal) => {
    const mod = await importOriginal() as object;
    return{
        ...mod,
        useParams: useParamsMock,
    }
});

import {afterEach, describe } from "vitest";
import {cleanup,  render, screen, } from "@testing-library/react";
import {createMemoryRouter, RouterProvider,} from "react-router-dom";

import {path} from "../router/Routes.tsx";
import PetPage from "./PetPage.tsx";

describe(PetPage.name, () => {
    afterEach(() =>{
        cleanup();
        vi.clearAllMocks();
    });

    it("should show an error if id in search query is empty.", () =>{
        // Arrange.
        // MUST reset mock from top.
        useParamsMock.mockReturnValue({});
        const routes = [
            {
                path: `${path.search}/:petType`,
                element: <PetPage />
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: [`${path.search}/:petType`],
            initialIndex: 0,
        });
        render(<RouterProvider router={router}/>);
        expect(screen.getByText(/invalid/i)).toBeInTheDocument();
    });
    it("should not show error if id in search query is not empty.", () =>{
        // Arrange.
        useParamsMock.mockReturnValue({id: "3"});
        const routes = [
            {
                path: `${path.search}/:petType`,
                element: <PetPage />
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: [`${path.search}/:petType`],
            initialIndex: 0,
        });
        render(<RouterProvider router={router}/>);
        expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument();
    });

});
