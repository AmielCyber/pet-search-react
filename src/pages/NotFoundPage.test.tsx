import {afterEach, describe} from "vitest";
import {cleanup, fireEvent, render, screen, waitFor,} from "@testing-library/react";
import {createMemoryRouter, RouterProvider} from "react-router-dom";

import {path} from "../router/Routes.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

describe(NotFoundPage.name, () => {
    // Arrange.
    beforeEach(() => {
        const routes = [
            {
                path: path.home,
                element: <h1>Home</h1>
            },
            {
                path: path.notFound,
                element: <NotFoundPage/>,
            },
        ];
        const router = createMemoryRouter(routes, {
            initialEntries: [path.home, path.notFound],
            initialIndex: 1,
        });
        render(<RouterProvider router={router}/>);
    });
    afterEach(() => cleanup());

    it("should display page is loading.", async () => {
        const headerElement = await screen.findByRole("heading", {name: /page not found/i})
        expect(headerElement).toBeInTheDocument();
    });
    it("should have a link with text that contains 'home'.", async () => {
        await waitFor(() => screen.getByRole("link"));
        const linkElement = screen.getByRole("link");
        expect(linkElement).toHaveTextContent(/home/i);
    });
    it("should redirect to home when link is clicked.", async () => {
        await waitFor(() => screen.getByRole("link"));
        const linkElement = screen.getByRole("link");
        fireEvent.click(linkElement);
        await waitFor(() => screen.getByRole("heading"));
        const headerElement = screen.getByRole("heading");
        expect(headerElement).toHaveTextContent(/home/i);
    });
});
