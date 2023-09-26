import {it} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";

import PetSearchFilterList from "./PetSearchFilterList.tsx";
import {selectDistance, selectSort } from "./selectInput.ts";

describe(PetSearchFilterList.name, () => {
    beforeEach(() => {
        render( <PetSearchFilterList searchParams={new URLSearchParams()} onQueryChange={vi.fn} isLoading={false}/>);
    })
    afterEach(() => cleanup());

    it("should have a sort select filter", () => {
        expect(screen.getAllByText(selectSort.label)).not.toBeNull();
    });
    it("should have a distance select filter", () => {
        expect(screen.getAllByText(selectDistance.label)).not.toBeNull();
    });
});