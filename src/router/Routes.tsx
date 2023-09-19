import {lazy, Suspense} from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
// Our imports.
import App from "../App";
import ErrorPage from "../pages/ErrorPage.tsx";
import HomePage from "../pages/HomePage";
import LoadingPage from "../pages/LoadingPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";

const PetSearchPage = lazy(() => import("../pages/PetSearchPage"))
const PetPage = lazy(() => import("../pages/PetPage"))

export const path = {
    home: "/",
    search: "/search",
    pets: "/pets",
    notFound: "/not-found",
}

const router = createBrowserRouter([
    {
        path: path.home,
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: path.home,
                element: <HomePage/>
            },
            {
                path: `${path.search}/:petType`,
                element:
                    <Suspense fallback={<LoadingPage pageName="search"/>}>
                        <PetSearchPage/>
                    </Suspense>
            },
            {
                path: `${path.pets}/:id`,
                element:
                    <Suspense fallback={<LoadingPage pageName="pet"/>}>
                        <PetPage/>
                    </Suspense>
            },
            {
                path: path.notFound,
                element: <NotFoundPage />
            },
            {path: "*", element: <Navigate replace to={path.notFound}/>},
        ],
    },
]);

export default router;
