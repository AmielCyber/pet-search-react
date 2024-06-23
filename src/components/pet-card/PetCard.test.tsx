import {describe} from "vitest";
import PetCard from "./PetCard.tsx";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import Pet from "../../models/pet.ts";
import {path} from "../../router/Routes.tsx";
import {LocationProvider} from "../../hooks/LocationContext.tsx";
import {createMemoryRouter, RouterProvider} from "react-router-dom";

const useSWRConfigMock = vi.hoisted(() => vi.fn(() => ({mutate: () => undefined})));
vi.mock("swr", async (importOriginal) => {
    const mod = await importOriginal() as object;
    return {
        ...mod,
        useSWRConfig: useSWRConfigMock,
    }
});

const petId = 0;
const petMock: Pet = {
    age: "Young",
    description: null,
    distance: 2,
    gender: "Female",
    id: petId,
    name: "",
    photos: [],
    primaryPhotoCropped: null,
    size: "medium",
    status: "",
    type: "Cat",
    url: ""
}
describe(PetCard.name, () => {
    beforeEach(() => {
        const routes = [
            {
                path: `${path.search}/:petType`,
                element: (
                    <LocationProvider>
                        <PetCard pet={petMock}/>
                    </LocationProvider>
                ),
            },
            {
                path: `${path.pets}/:id`,
                element: (
                    <h2>In Pets</h2>
                )
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: [`${path.search}/:petType`, `${path.search}/:petType`],
            initialIndex: 0,
        });
        render(<RouterProvider router={router}/>);
    })
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });


    it("should add pet data to cache when user clicks on the link.", () => {
        const linkElement = screen.getByRole("link");
        fireEvent.click(linkElement);
        expect(useSWRConfigMock).toHaveBeenCalledTimes(1);
    })
    it("should have have link to pets/", () => {
        const expectedHref = `${path.pets}/${petId}`
        const linkElement = screen.getByRole("link");
        expect(linkElement).toHaveAttribute("href", expectedHref);
    })
    it("should direct to pets/ when user clicks link.", () => {
        const linkElement = screen.getByRole("link");
        fireEvent.click(linkElement);
        expect(screen.getByRole("heading", {name: /in pets/i})).toBeInTheDocument();
    })
});