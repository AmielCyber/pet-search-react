/**
 * @vitest-environment jsdom
 */
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import {afterEach, beforeEach, describe, expect} from "vitest";

import ZipcodeFormModal from "./ZipcodeFormModal.tsx";

const propsOnCloseMock = vi.fn();
const propsOnZipcodeChangeMock = vi.fn();

describe(ZipcodeFormModal.name, () => {
    beforeEach(() => {
        render(<ZipcodeFormModal onClose={propsOnCloseMock} onZipcodeChange={propsOnZipcodeChangeMock}/>);
    });
    afterEach(() => {
        propsOnCloseMock.mockClear();
        propsOnZipcodeChangeMock.mockClear();
        cleanup();
    });

    it('should display New Zip code as header.', () => {
        // Arrange
        const headerElement = screen.getByRole("heading");
        // Act and Assert
        expect(headerElement.textContent).toMatch(/New Zip Code/i);
    });
    it('should display Enter Zip Code label.', () => {
        expect(screen.getByLabelText(/enter zip code/i));
    });
    it('should have a cancel button.', () => {
        const buttons = screen.getAllByRole("button");
        const cancelReg = /cancel/i;
        // Undefined if not found.
        const cancelButton = getButtonWithTextContent(buttons, cancelReg);
        expect(cancelButton).not.toBeUndefined();
    });
    it('should have a submit button.', () => {
        const buttons = screen.getAllByRole("button");
        // Create regex for each string in buttons to match the text content cancel.
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        expect(submitButton).not.toBeUndefined();
    });
    it('should call the onClose prop function after the cancel button is clicked.', () => {
        // Arrange
        const buttons = screen.getAllByRole("button");
        const cancelReg = /cancel/i;
        const cancelButton = getButtonWithTextContent(buttons, cancelReg);
        expect(cancelButton).not.toBeUndefined();
        // Act
        fireEvent.click(cancelButton as HTMLElement);
        expect(propsOnCloseMock).toBeCalled();
    });
    it('should not call the onSubmit prop function if input is empty.', () => {
        // Arrange
        const buttons = screen.getAllByRole("button");
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        expect(submitButton).not.toBeUndefined();
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: ''}});
        fireEvent.click(submitButton as HTMLElement);
        expect(propsOnZipcodeChangeMock).not.toBeCalled();
    });
    it('should not call the onSubmit prop function if input does not have numbers exclusively.', () => {
        // Arrange
        const buttons = screen.getAllByRole("button");
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        expect(submitButton).not.toBeUndefined();
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: 'abcde'}});
        fireEvent.click(submitButton as HTMLElement);
        expect(propsOnZipcodeChangeMock).not.toBeCalled();
    });
    it('should not call the onSubmit prop function if input does only has less than 5 numbers..', () => {
        // Arrange
        const buttons = screen.getAllByRole("button");
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        expect(submitButton).not.toBeUndefined();
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: '123'}});
        fireEvent.click(submitButton as HTMLElement);
        expect(propsOnZipcodeChangeMock).not.toBeCalled();
    });
    it('should call the onSubmit prop function if input is made of 5 numbers', function () {
        const buttons = screen.getAllByRole("button");
        const submitReg = /submit/i;
        // Undefined if not found.
        const submitButton = getButtonWithTextContent(buttons, submitReg);
        expect(submitButton).not.toBeUndefined();
        const input = screen.getByRole<HTMLTextAreaElement>("textbox");
        fireEvent.change(input, {target: {value: '92101'}});
        fireEvent.click(submitButton as HTMLElement);
        expect(propsOnZipcodeChangeMock).toBeCalled();
    });
});
function getButtonWithTextContent(buttons: HTMLElement[], textContent: RegExp): HTMLElement | undefined {
    return buttons.find(button => button.textContent?.match(textContent));
}

