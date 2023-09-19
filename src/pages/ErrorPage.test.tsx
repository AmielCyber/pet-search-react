/**
 * @vitest-environment jsdom
 */
import {afterEach, describe} from "vitest";
import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {createMemoryRouter, RouterProvider,} from "react-router-dom";

import ErrorPage from "./ErrorPage.tsx";
import {path} from "../router/Routes.tsx";

describe(ErrorPage.name, () => {
    // Arrange.
    beforeEach(() => {
        const routes = [
            {
                path: path.home,
                element: <h1>Home</h1>
            },
            {
                path: "/error-test",
                element: <ErrorPage/>,
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: [path.home, "/error-test"],
            initialIndex: 1,
        });
        render(<RouterProvider router={router}/>);
    });
    afterEach(() => cleanup());

    it("should have a link with text that contains 'home'.", async () => {
        await waitFor(() => screen.getByRole("link"));
        const linkElement = screen.getByRole("link");
        expect(linkElement).toHaveTextContent(/home/i);
    })

    it("should redirect to home when link is clicked.", async () => {
        await waitFor(() => screen.getByRole("link"));
        const linkElement = screen.getByRole("link");
        fireEvent.click(linkElement);
        await waitFor(() => screen.getByRole("heading"));
        const headerElement = screen.getByRole("heading");
        expect(headerElement).toHaveTextContent(/home/i);
    })
});
