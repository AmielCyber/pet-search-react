/**
 * @vitest-environment jsdom
 */
import {afterEach, describe } from "vitest";
import {cleanup, render, screen, act, fireEvent} from "@testing-library/react";
import ToggleThemeButton from "./ToggleThemeButton.tsx";

const onToggleDarkModeMock = vi.fn();
describe(ToggleThemeButton.name, () => {
    afterEach(() =>{
        cleanup()
        onToggleDarkModeMock.mockClear();
    });

    it("should have a title with 'mode'.", () => {
        act(() => render(
            <ToggleThemeButton isDarkMode={false} onToggleDarkMode={onToggleDarkModeMock} />
        ));
        const buttonElement = screen.getByRole("button");
        expect(buttonElement.title).toMatch(/mode/i);
    });
    it("should have title 'dark mode' when isDarkMode is false.", () => {
        const isDarkMode = false;
        act(() => render(
            <ToggleThemeButton isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkModeMock} />
        ));
        const buttonElement = screen.getByRole("button");
        expect(buttonElement.title).toMatch(/dark/i);
    });
    it("should have title 'light mode' when isDarkMode is true.", () => {
        const isDarkMode = true;
        act(() => render(
            <ToggleThemeButton isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkModeMock} />
        ));
        const buttonElement = screen.getByRole("button");
        expect(buttonElement.title).toMatch(/light/i);
    });
    it("should call onToggleDarkMode when clicked.", () => {
        act(() => render(
            <ToggleThemeButton isDarkMode={false} onToggleDarkMode={onToggleDarkModeMock} />
        ));
        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);
        expect(onToggleDarkModeMock).toBeCalled();
    });
});
