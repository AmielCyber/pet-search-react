/**
 * @vitest-environment jsdom
 */
import {cleanup, render, screen} from "@testing-library/react";

import ImageNavigationPointerButton from "./ImageNavigationPointerButton.tsx";

const onClickNavigationMock = vi.fn();
describe(ImageNavigationPointerButton.name, () => {
    // Annihilate.
    afterEach(() => {
        cleanup();
        onClickNavigationMock.mockClear();
    });

    it("should have aria label 'next' when is next image is true.", async () => {
        // Arrange.
        render(
            <ImageNavigationPointerButton
                onClickNavigation={onClickNavigationMock}
                isNextImage={true}
            >
                {null}
            </ImageNavigationPointerButton>
        );
        // Act.
        const labelElement = screen.getByLabelText(/next/i);
        // Assert.
        expect(labelElement).toBeInTheDocument();
    });

    it("should have aria label 'previous' when is next image is false.", async () => {
        // Arrange.
        render(
            <ImageNavigationPointerButton
                onClickNavigation={onClickNavigationMock}
                isNextImage={false}
            >
                {null}
            </ImageNavigationPointerButton>
        );
        // Act.
        const labelElement = screen.getByLabelText(/previous/i);
        // Assert.
        expect(labelElement).toBeInTheDocument();
    });

});