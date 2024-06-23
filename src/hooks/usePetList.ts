import useSWR from "swr";
import {useRef} from "react";

import type PetResponse from "../models/petResponse.ts";
import type {Pagination} from "../models/petResponse.ts"
import Pet from "../models/pet.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

const DEFAULT_ITEMS_PER_PAGE = 20;

// Let SWR handle all errors.
const fetcher = async (url: string): Promise<PetResponse> => {
    const response: Response = await fetch(BASE_URL + url, {
        method: "GET",
    });

    if (!response.ok) {
        const responseData = await response.json();
        // Make SWR catch the failed response.
        throw new Error(responseData?.message || response.statusText);
    }

    const pagination = JSON.parse(response.headers.get("X-Pagination") ?? "") as Pagination;
    const responseData: Pet[]  = await response.json();
    return {
        pets: responseData,
        pagination: pagination,
    }
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
        if (totalPagesRef.current !== data.pagination.totalPages) {
            totalPagesRef.current = data.pagination.totalPages;
        }
        if (currentPageRef.current !== data.pagination.currentPage) {
            currentPageRef.current = data.pagination.currentPage;
        }
        if (totalCountRef.current !== data.pagination.totalCount) {
            totalCountRef.current = data.pagination.totalCount;
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
