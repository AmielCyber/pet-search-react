import {describe} from "vitest";
import {PetCardBody} from "./PetCardBody.tsx";
import {cleanup, render, screen} from "@testing-library/react";

describe(PetCardBody.name, () => {
    afterEach(() => cleanup());

    it("should display pet's name." , () => {
        const name = "pet-test";
        const expectedName = new RegExp(name, "i");
        render(<PetCardBody name={name} age="young" gender="female" distance={2} />)
        expect(screen.getByText(expectedName)).toBeInTheDocument();
    });
    it("should display pet's gender." , () => {
        const gender = "female";
        const expectedGender = new RegExp(gender, "i");
        render(<PetCardBody name="name" age="young" gender={gender} distance={2} />)
        expect(screen.getByText(expectedGender)).toBeInTheDocument();
    });
    it("should display pet's age." , () => {
        const age = "young";
        const expectedAge = new RegExp(age, "i");
        render(<PetCardBody name="name" age={age} gender="female" distance={2} />)
        expect(screen.getByText(expectedAge)).toBeInTheDocument();
    });
    it("should display distance formatted to one decimal point." , () => {
        const distance = 1.123;
        const expectedDistanceDisplay = new RegExp("1.1 miles");
        render(<PetCardBody name="name" age="young" gender="female" distance={distance} />)
        expect(screen.getByText(expectedDistanceDisplay)).toBeInTheDocument();
    });
});