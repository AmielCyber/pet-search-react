import {afterEach, describe} from "vitest";
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";

import {path} from "../../router/Routes.tsx";
import PetSelectionCard from "./PetSelectionCard.tsx";

describe(PetSelectionCard.name, () => {
    afterEach(() => cleanup());

    it("should display pet name.", async () => {
        // Arrange
        const petTypePlural = "dogs";
        const zipcode= "90210";
        const routes = [
            {
                path: path.home,
                element: <PetSelectionCard petTypePlural={petTypePlural} zipcode={zipcode}>Ok</PetSelectionCard>
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
        const petNameRegex = new RegExp(petTypePlural,"i");
        // Act.
        const textElement = await screen.findByText(petNameRegex);
        // Assert.
        expect(textElement).toBeInTheDocument();
    });

    it("should redirect to pet search path when link is clicked.", async() => {
        // Arrange
        const petTypePlural = "dogs";
        const zipcode= "90210";
        const routes = [
            {
                path: path.home,
                element: <PetSelectionCard petTypePlural={petTypePlural} zipcode={zipcode}>Ok</PetSelectionCard>
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
        // Act.
        fireEvent.click(screen.getByRole("link"))
        await waitFor(() => screen.getByRole("heading"));
        const headerElement = screen.getByRole("heading");
        // Assert.
        expect(headerElement).toHaveTextContent(/success/i);
    });
});
