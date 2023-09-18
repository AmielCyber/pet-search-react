/**
 * @vitest-environment jsdom
 */
import {afterEach, describe } from "vitest";
import {cleanup, render, screen, act, fireEvent} from "@testing-library/react";
import LocateMeButton from "./LocateMeButton.tsx";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const onLocateMe = () => {};
const propsOnLocateMeMock = vi.fn(onLocateMe);
describe("HomeLink", () => {
    // Arrange.
    afterEach(() =>{
        cleanup()
        propsOnLocateMeMock.mockClear();
    });

    it("should have title 'locate me'", () => {
        // Act
        act(() => {
            render(
            <LocateMeButton onLocateMe={propsOnLocateMeMock} loadingNewZipcode={false}/>
            );
        });
        const buttonElement = screen.getByRole("button");
        // Assert
        expect(buttonElement).toHaveAttribute("title");
        expect(buttonElement.title).toMatch(/locate me/i);
    });

    it("should be disabled if loading new zipcode.", () => {
        // Act
        act(() => {
            render(
                <LocateMeButton onLocateMe={propsOnLocateMeMock} loadingNewZipcode={true}/>
            );
        });
        const buttonElement = screen.getByRole("button");
        // Assert
        expect(buttonElement).toBeDisabled();
    });

    it("should call onLocateMe on click.", () => {
        // Act
        act(() => {
            render(
                <LocateMeButton onLocateMe={propsOnLocateMeMock} loadingNewZipcode={false}/>
            );
        });
        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);
        // Assert
        expect(propsOnLocateMeMock).toBeCalled();
    });
});
