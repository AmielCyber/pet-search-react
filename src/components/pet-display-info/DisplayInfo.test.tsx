/**
 * @vitest-environment jsdom
 */
import DisplayInfo from "./DisplayInfo.tsx";

import {describe} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";
import {testId} from "./DisplayInfo.tsx";

const useSinglePetMock = vi.hoisted(() => vi.fn());
vi.mock("../../hooks/useSinglePet.ts", async (importOriginal) => {
    const mod = await importOriginal() as object;
    return {
        ...mod,
        default: useSinglePetMock
    }
});



describe("DisplayInfo", () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    })

    it("should display an error when useSinglePet returns an unsuccessful response.", async () => {
        // Arrange
        useSinglePetMock.mockReturnValue({
            petData: undefined,
            error: new Error("error"),
            isLoading: false,
        });
        render(<DisplayInfo id="1" />);
        expect(await screen.findByText(/error/i)).toBeInTheDocument();
    });

    it("should display loading screen when useSinglePet is loading.", async () => {
        // Arrange
        useSinglePetMock.mockReturnValue({
            petData: undefined,
            error: undefined,
            isLoading: true,
        });
        render(<DisplayInfo id="1" />);
        expect(await screen.findByTestId(testId)).toHaveAttribute("aria-busy", "true");
    });
    it("should display pet summary when useSinglePet has retrieve an object.", async () => {
        // Arrange
        const pet = {
            id: 3,
            url: "",
            type: "Cat",
            gender: "Male",
            age: "Baby",
            size: "small",
            name: "pet successful",
            description: null,
            photos: [],
            primary_photo_cropped:  null, // Null if photos is an empty array.
            status: "",
            distance: null,
        }
        useSinglePetMock.mockReturnValue({
            petData: pet,
            error: undefined,
            isLoading: false,
        });
        render(<DisplayInfo id="1" />);
        expect(await screen.findByRole("heading", {name: /pet successful/i})).toBeInTheDocument();
    });

});