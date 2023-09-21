/**
 * @vitest-environment jsdom
 */
import {cleanup, render, screen} from "@testing-library/react";

import type {PhotoSize} from "../../models/pet.ts";
import ImageContainer from "./ImageContainer.tsx";

describe(ImageContainer.name, () => {
    // Annihilate.
    afterEach(() => {
        cleanup();
    });

    it("should have an image.", async () => {
        // Arrange.
        const photo: PhotoSize = {
            small: "",
            medium: "",
            large: "",
            full: "",
        }

        render(<ImageContainer name={"photo name"} photos={[photo]}/>);
        const imageElement = screen.getByRole("img");
        // Assert.
        expect(imageElement).toBeInTheDocument();
    });

    it("should not display an img element if photos is empty.", async () => {
        // Arrange.
        render(<ImageContainer name={"photo name"} photos={[]}/>);
        const imageElement = screen.queryByRole("img");
        // Assert.
        expect(imageElement).not.toBeInTheDocument();
    });
});
