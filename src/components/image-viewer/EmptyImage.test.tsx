/**
 * @vitest-environment jsdom
 */
import {cleanup, render, screen} from "@testing-library/react";

import EmptyImage from "./EmptyImage.tsx";

const onClickNavigationMock = vi.fn();
describe(EmptyImage.name, () => {
    // Annihilate.
    afterEach(() => {
        cleanup();
        onClickNavigationMock.mockClear();
    });

    it("should have aria label 'empty image'.", async () => {
        // Arrange.
        render(<EmptyImage/>);
        const labelElement = screen.getByLabelText(/empty image/i);
        // Assert.
        expect(labelElement).toBeInTheDocument();
    });
});
