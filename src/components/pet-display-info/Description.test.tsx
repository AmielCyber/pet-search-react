/**
 * @vitest-environment jsdom
 */
import {describe} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";

import Description from "./Description.tsx";

describe(Description.name, () => {
    afterEach(() => cleanup())

    it("should decode description and remove any tags.", () => {
        // Arrange
        const expectedDecodedText = "This is a test";
        const stringTest = `<form>${expectedDecodedText}</form>`;
        const expectedText = new RegExp(expectedDecodedText, "i");
        // Act.
        render(<Description description={stringTest} url={"/"}/>)
        // Assert.
        expect(screen.queryByRole("form")).not.toBeInTheDocument();
        expect(screen.getByText(expectedText)).toBeInTheDocument();
    })
    it("should have link with text content 'PetFinder.com'.", () => {
        // Act.
        render(<Description description={"Test"} url={"/"}/>)
        // Assert.
        expect(screen.queryByRole("link")).toBeInTheDocument();
        expect(screen.queryByRole("link")).toHaveTextContent(/PetFinder.com/);
    })
    it("should have link with with passed props url.", () => {
        // Arrange
        const expectedUrl = "/";
        // Act.
        render(<Description description={"Test"} url={expectedUrl}/>)
        // Assert.
        expect(screen.queryByRole("link")).toHaveAttribute("href", expectedUrl);
    })
});
