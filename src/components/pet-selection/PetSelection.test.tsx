import {afterEach, describe} from "vitest";
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import {cleanup, render, screen, } from "@testing-library/react";

import PetSelection from "./PetSelection.tsx";
import {LocationProvider} from "../../hooks/LocationContext.tsx";
import {path} from "../../router/Routes.tsx";

describe(PetSelection.name, () => {
    beforeEach(() => {
        // Arrange
        const routes = [
            {
                path: path.home,
                element: (
                   <LocationProvider>
                       <PetSelection />
                   </LocationProvider>
                ),
            },
            {
                path: `${path.search}/:petType`,
                element: <h1>Success</h1>
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: [path.home, path.search],
            initialIndex: 0,
        });
        render(<RouterProvider router={router}/>);
    });
    afterEach(() => cleanup());

    it("should display cats.", async () => {
        // Act.
        const textElement = await screen.findByText(/cats/i);
        // Assert.
        expect(textElement).toBeInTheDocument();
    });
    it("should display dogs.", async () => {
        // Act.
        const textElement = await screen.findByText(/dogs/i);
        // Assert.
        expect(textElement).toBeInTheDocument();
    });

});
