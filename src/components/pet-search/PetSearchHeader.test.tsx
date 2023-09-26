import {describe, it} from "vitest";
import PetSearchHeader from "./PetSearchHeader.tsx";
import {render, screen} from "@testing-library/react";

describe(PetSearchHeader.name, () => {
    it("should display zipcode", () => {
        const expectedZipCode = "92101";
        render(<PetSearchHeader locationName={expectedZipCode} petType={"cat"} totalCount={100}/>);
        expect(screen.getByText(expectedZipCode)).toBeInTheDocument();
    });
    it("should display amount of adoptable pets.", () => {
        const totalCount = 100;
        const expectedCount = new RegExp(totalCount.toString());
        render(<PetSearchHeader locationName="92101" petType={"cat"} totalCount={totalCount}/>);
        expect(screen.getByText(expectedCount)).toBeInTheDocument();
    });
})