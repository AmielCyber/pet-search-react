/**
 * @vitest-environment jsdom
 */
import {afterEach, describe} from "vitest";
import {cleanup, render, screen, } from "@testing-library/react";
import LoadingPage from "./LoadingPage.tsx";

describe(LoadingPage.name, () => {
    // Arrange.
    afterEach(() => cleanup());

    it("should display page is loading.", async () => {
        render(<LoadingPage pageName=""/>)

        const headerElement = screen.getByRole("heading");
        expect(headerElement).toHaveTextContent(/loading * page/i)
    })
    it("should display page name when loading.", async () => {
        const pageName = "Home Page";
        render(<LoadingPage pageName={pageName}/>)

        const headerElement = screen.getByRole("heading");
        const regex = new RegExp(`${pageName}`, "i");
        expect(headerElement).toHaveTextContent(regex)
    })
});
