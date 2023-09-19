/**
 * @vitest-environment jsdom
 */
import {afterEach, describe } from "vitest";
import {cleanup, render, screen, act} from "@testing-library/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import HomeLink from "./HomeLink.tsx";

describe(HomeLink.name, () => {
    // Arrange.
    beforeEach(() => render(
        <BrowserRouter>
            <HomeLink />
            <Routes >
                <Route path="/" element={<h1>Home</h1>}/>
            </Routes>
        </BrowserRouter>
    ));
    afterEach(() => cleanup());

    it("should have display name of Pet Search.", () => {
        // Arrange and Act.
        const linkElement = screen.getByRole("link");
        // Assert
        expect(linkElement).toHaveTextContent(/pet search/i);
    });

    it("should navigate to home on click.", () => {
        // Arrange
        const linkElement = screen.getByRole("link");
        // Act
        act(() => linkElement.click());
        // Assert
        expect(screen.getByRole("heading")).toHaveTextContent(/home/i);
    });
});
