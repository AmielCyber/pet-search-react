/**
 * @vitest-environment jsdom
 */
import {afterEach, describe } from "vitest";
import {cleanup, render, screen, act, fireEvent, waitFor} from "@testing-library/react";
import SetZipCodeButton from "./SetZipCodeButton.tsx";
import {Location} from "../../hooks/LocationContext.tsx";

const propsOnZipcodeChangeMock = vi.fn();

const defaultLocation: Location = {
    zipcode: "92101",
    locationName: "San Diego, California 92101, United States",
};

describe(SetZipCodeButton.name, () => {
    afterEach(() =>{
        cleanup()
        propsOnZipcodeChangeMock.mockClear();
    });

    it("should display zipcode numbers.", () => {
        act(() => {
            render(
                <SetZipCodeButton
                    location={defaultLocation}
                    loadingNewZipcode={false}
                    onZipcodeChange={propsOnZipcodeChangeMock}
                />
            );
        });
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toHaveTextContent(defaultLocation.zipcode);
    });

    it("should be disabled if loading new zipcode.", () => {
        // Act
        act(() => {
            render(
                <SetZipCodeButton
                    location={defaultLocation}
                    loadingNewZipcode={true}
                    onZipcodeChange={propsOnZipcodeChangeMock}
                />
            );
        });
        const buttonElement = screen.getByRole("button");
        // Assert
        expect(buttonElement).toBeDisabled();
    });

    it("should not show zipcodeForm on start.", () => {
        // Act
        act(() => {
            render(
                <SetZipCodeButton
                    location={defaultLocation}
                    loadingNewZipcode={false}
                    onZipcodeChange={propsOnZipcodeChangeMock}
                />
            );
        });
        const formElement = screen.queryByRole("form");
        // Assert
        expect(formElement).toBeNull();
    });

    it("should show zipcodeForm on click.", async () => {
        // Act
        act(() => {
            render(
                <SetZipCodeButton
                    location={defaultLocation}
                    loadingNewZipcode={false}
                    onZipcodeChange={propsOnZipcodeChangeMock}
                />
            );
        });
        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);
        // Assert
        await waitFor(() => {
            expect(screen.getByRole("form")).toBeInTheDocument();
        });
    });
});
