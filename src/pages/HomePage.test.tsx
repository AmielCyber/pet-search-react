import {afterEach, describe} from "vitest";
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import {cleanup, render, screen, } from "@testing-library/react";

import HomePage from "./HomePage.tsx";
import {LocationProvider} from "../hooks/LocationContext.tsx";
import {path} from "../router/Routes.tsx";

describe(HomePage.name, () => {
    beforeEach(() => {
        // Arrange
        const routes = [
            {
                path: path.home,
                element: (
                    <LocationProvider>
                        <HomePage />
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

    it("should have a main header.", async () => {
        // Act.
        const headerElement = await screen.findByRole("heading" , {level: 2})
        // Assert.
        expect(headerElement).toBeInTheDocument();
    });
});
