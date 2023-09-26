import useSWR from "swr";
import {useRef} from "react";

import type PetResponse from "../models/petResponse.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

const DEFAULT_ITEMS_PER_PAGE = 20;

// Let SWR handle all errors.
const fetcher = async (url: string) => {
    const response: Response = await fetch(BASE_URL + url, {
        method: "GET",
    });

    if (!response.ok) {
        const responseData = await response.json();
        // Make SWR catch the failed response.
        throw new Error(responseData?.message || response.statusText);
    }

    const responseData: Promise<PetResponse> = await response.json();
    return responseData;
};

// Set revalidation options, fetches data again if true during the following conditions:
const revalidateOptions = {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
};

export default function usePetList(url: string) {
    const currentPageRef = useRef(1); // Maintain current page while fetching data.
    const totalPagesRef = useRef(1); // Maintain total pages while fetching data.
    const totalCountRef = useRef(0); // Maintain total pages while fetching data.
    // Only fetch data if we have an access token.
    const {data, error, isLoading} = useSWR(
        url,
        (url) => fetcher(url),
        revalidateOptions
    );

    // Adjust current page or total pages if they had changed.
    if (data?.pagination) {
        if (totalPagesRef.current !== data.pagination.total_pages) {
            totalPagesRef.current = data.pagination.total_pages;
        }
        if (currentPageRef.current !== data.pagination.current_page) {
            currentPageRef.current = data.pagination.current_page;
        }
        if (totalCountRef.current !== data.pagination.total_count) {
            totalCountRef.current = data.pagination.total_count;
        }
    }

    return {
        petListData: data?.pets,
        error: error,
        isLoading: isLoading,
        currentPage: currentPageRef.current,
        totalPages: totalPagesRef.current,
        itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
        totalCount: totalCountRef.current,
    };
}
