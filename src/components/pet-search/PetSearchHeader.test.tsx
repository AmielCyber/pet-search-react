import {describe, it} from "vitest";
import PetSearchHeader from "./PetSearchHeader.tsx";
import {render, screen} from "@testing-library/react";

describe(PetSearchHeader.name, () => {
    it("should display zipcode", () => {
        const expectedZipCode = "92101";
        render(<PetSearchHeader locationName={expectedZipCode} petType={"cat"}/>);
        expect(screen.getByText(expectedZipCode)).toBeInTheDocument();
    });
})