import PetSearchFilter from "./PetSearchFilter.tsx";
import {cleanup, render, screen} from "@testing-library/react";
import {it} from "vitest";
import {selectSort} from "./selectInput.ts";

describe(PetSearchFilter.name, () => {
    afterEach(() => cleanup());

    it("should be disabled if props is loading.", () => {
        render(
            <PetSearchFilter
                selectObject={selectSort}
                currentItem={selectSort.defaultDisplayItem}
                onSelectChange={vi.fn()}
                isLoading={true}
            />
        );
        expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
    })
    it("should be not be disabled if props is not loading.", () => {
        render(
            <PetSearchFilter
                selectObject={selectSort}
                currentItem={selectSort.defaultDisplayItem}
                onSelectChange={vi.fn()}
                isLoading={false}
            />
        );
        expect(screen.getByRole("button")).not.toHaveAttribute("aria-disabled", "true");
    })
});