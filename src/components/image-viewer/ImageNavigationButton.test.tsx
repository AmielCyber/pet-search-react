/**
 * @vitest-environment jsdom
 */
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import ImageNavigationButton from "./ImageNavigationButton.tsx";

const propsOnNavigateImageMock = vi.fn();
describe(ImageNavigationButton.name, () => {
    // Arrange.
    afterEach(() => {
        cleanup();
        propsOnNavigateImageMock.mockClear();
    });

    it("should have aria label with image number.", async () => {
        // Arrange.
        const imageNumber = 1;
        const expectedImageNumberDisplay = imageNumber + 1;
        render(
            <ImageNavigationButton
                isCurrentImage={false}
                imageNumber={imageNumber}
                onNavigateImage={propsOnNavigateImageMock}
            />
        );
        // Act.
        const regex = new RegExp(expectedImageNumberDisplay.toString(), "i");
        const labelElement = screen.getByLabelText(regex);
        // Assert.
        expect(labelElement).toBeInTheDocument();
    });

    it("should have aria label 'select image' when image is not current image.", async () => {
        // Arrange.
        render(
            <ImageNavigationButton
                isCurrentImage={false}
                imageNumber={1}
                onNavigateImage={propsOnNavigateImageMock}
            />
        );
        // Act.
        const labelElement = screen.getByLabelText(/select image/i);
        // Assert.
        expect(labelElement).toBeInTheDocument();
    });

    it("should have aria label 'current image' when image is current image.", async () => {
        // Arrange.
        render(
            <ImageNavigationButton
                isCurrentImage={true}
                imageNumber={1}
                onNavigateImage={propsOnNavigateImageMock}
            />
        );
        // Act.
        const labelElement = screen.getByLabelText(/current image/i);
        // Assert.
        expect(labelElement).toBeInTheDocument();
    });

    it("should be disable when image is current image.", async () => {
        // Arrange.
        render(
            <ImageNavigationButton
                isCurrentImage={true}
                imageNumber={1}
                onNavigateImage={propsOnNavigateImageMock}
            />
        );
        // Act.
        const buttonElement = screen.getByRole("button");
        // Assert.
        expect(buttonElement).toHaveAttribute("disabled");
    });

    it("should not be disable when image is not the current image.", async () => {
        // Arrange.
        render(
            <ImageNavigationButton
                isCurrentImage={false}
                imageNumber={1}
                onNavigateImage={propsOnNavigateImageMock}
            />
        );
        // Act.
        const buttonElement = screen.getByRole("button");
        // Assert.
        expect(buttonElement).not.toHaveAttribute("disabled");
    });

    it("should call onNavigateImage when image is not the current image and its clicked.", async () => {
        // Arrange.
        render(
            <ImageNavigationButton
                isCurrentImage={false}
                imageNumber={1}
                onNavigateImage={propsOnNavigateImageMock}
            />
        );
        // Act.
        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);
        // Assert.
        expect(propsOnNavigateImageMock).toBeCalled();
    });

    it("should not call onNavigateImage when image is the current image and its clicked.", async () => {
        // Arrange.
        render(
            <ImageNavigationButton
                isCurrentImage={true}
                imageNumber={1}
                onNavigateImage={propsOnNavigateImageMock}
            />
        );
        // Act.
        const buttonElement = screen.getByRole("button");
        fireEvent.click(buttonElement);
        // Assert.
        expect(propsOnNavigateImageMock).not.toBeCalled();
    });

});
