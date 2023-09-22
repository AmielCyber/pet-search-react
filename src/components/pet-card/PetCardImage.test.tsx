import {PetCardImage} from "./PetCardImage.tsx";
import {cleanup, render, screen} from "@testing-library/react";

describe(PetCardImage.name, () => {
    afterEach(() => cleanup())

    it("should display image if image url is passed.", () => {
        render(<PetCardImage petImgUrl={"/pet-url-test"} petType="Dog" name="pet-test"/>);
        expect(screen.getByRole("img")).toBeInTheDocument();
    })
    it("should have the pet's name as the image alt.", () => {
        const petName = "pet-test";
        render(<PetCardImage petImgUrl={"/pet-url-test"} petType="Dog" name={petName}/>);
        expect(screen.getByRole("img")).toHaveAttribute("alt", petName);
    })
    it("should display dog icon if image url is null and pet type is 'Dog'.", () => {
        render(<PetCardImage petImgUrl={null} petType="Dog" name={"pet-test"}/>);
        expect(screen.getByTestId("dog-icon")).toBeInTheDocument();
    })
    it("should display cat icon if image url is null and pet type is 'Cat'.", () => {
        render(<PetCardImage petImgUrl={null} petType="Cat" name={"pet-test"}/>);
        expect(screen.getByTestId("cat-icon")).toBeInTheDocument();
    })
});