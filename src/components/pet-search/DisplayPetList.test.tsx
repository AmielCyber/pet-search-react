import {describe} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";

import DisplayPetList from "./DisplayPetList.tsx";
import {path} from "../../router/Routes.tsx";
import {LocationProvider} from "../../hooks/LocationContext.tsx";
import {createMemoryRouter, RouterProvider} from "react-router-dom";
import Pet from "../../models/pet.ts";

const petMock: Pet = {
    age: "Young",
    description: null,
    distance: 2,
    gender: "Female",
    id: 0,
    name: "",
    photos: [],
    primaryPhotoCropped: null,
    size: "medium",
    status: "",
    type: "Cat",
    url: ""
}
describe(DisplayPetList.name, () => {
    afterEach(() => cleanup());

    it("should display loading PetLoadingList when data is loading.", () => {
        const routes = [
            {
                path: `${path.search}/:petType`,
                element: (
                    <LocationProvider>
                        <DisplayPetList petData={undefined} isLoading={true} itemsPerPage={20}/>
                    </LocationProvider>
                ),
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: [`${path.search}/:petType`],
            initialIndex: 0,
        });
        render(<RouterProvider router={router}/>);
        expect(screen.getByTestId("pet-list-container")).toHaveAttribute("aria-busy", "true");
    });

    it("should display pet data list when data is done loading.", () => {
        const routes = [
            {
                path: `${path.search}/:petType`,
                element: (
                    <LocationProvider>
                        <DisplayPetList petData={[petMock]} isLoading={false} itemsPerPage={20}/>
                    </LocationProvider>
                ),
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: [`${path.search}/:petType`],
            initialIndex: 0,
        });
        render(<RouterProvider router={router}/>);
        expect(screen.getByTestId("pet-list-container")).toHaveAttribute("aria-busy", "false");
    });

});