/**
 * @vitest-environment jsdom
 */
import {cleanup, render, screen} from "@testing-library/react";
import ImageNavigationButtonList from "./ImageNavigationButtonList.tsx";

const propsOnNavigateImageMock = vi.fn();
describe(ImageNavigationButtonList.name, () => {
    // Annihilate.
    afterEach(() => {
        cleanup();
        propsOnNavigateImageMock.mockClear();
    });

    it("should have a menu list.", () => {
        // Arrange.
        render(
            <ImageNavigationButtonList
                totalImages={5}
                currentImageNumber={1}
                onNavImage={propsOnNavigateImageMock}
            />
        );
        // Act.
        const menuElement = screen.getByRole("list");
        // Assert.
        expect(menuElement).toBeInTheDocument();
    });
});
