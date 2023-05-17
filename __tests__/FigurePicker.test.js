import { fireEvent, render, screen } from '@testing-library/react';
import { FigurePicker } from '../app/components/FigurePicker/FigurePicker';
import { Shape } from '../app/components/Figure/constants';

import '@testing-library/jest-dom';
import { mock } from 'node:test';

describe('Figure-Picker', () => {
    const mockClosePicker = jest.fn();
    const mockAddFigure = jest.fn();
    
    it('renders a disabled button with no shape selection', () => {
        render(<FigurePicker 
            addFigure={mockAddFigure}
            closePickerHandler={mockClosePicker}    
        />);
        const addButton = screen.getByRole('button', {
            name: /add/i
        });
        expect(addButton).toBeDisabled();
    });

    it('chooses a circle and add it', () => {
      render(<FigurePicker 
        addFigure={mockAddFigure}
        closePickerHandler={mockClosePicker}    
      />);
      const circle = screen.getByAltText(Shape.CIRCLE);
      fireEvent.click(circle);
      expect(circle.className).toContain("selected");    
      const addButton = screen.getByRole('button', {
          name: /add/i
      });
      expect(addButton).toBeEnabled();

      fireEvent.click(addButton);
      expect(mockAddFigure).toBeCalledWith(Shape.CIRCLE);
    });

    it('chooses multiple shapes', () => {
      render(<FigurePicker 
        addFigure={mockAddFigure}
        closePickerHandler={mockClosePicker}    
      />);

      const circle = screen.getByAltText(Shape.CIRCLE);
      fireEvent.click(circle);
      expect(circle.className).toContain("selected"); 

      const square = screen.getByAltText(Shape.SQUARE);
      fireEvent.click(square);
      expect(square.className).toContain("selected");
      expect(circle.className).not.toContain("selected");

      const triangle = screen.getByAltText(Shape.TRIANGLE);
      fireEvent.click(triangle);
      expect(triangle.className).toContain("selected");
      expect(square.className).not.toContain("selected");
      expect(circle.className).not.toContain("selected");
    })

    it('calls the close function', () => {
      render(<FigurePicker 
        addFigure={mockAddFigure}
        closePickerHandler={mockClosePicker}    
      />);
      const closeBtn = screen.getByRole('button', {
        name: /x/i
      });
      fireEvent.click(closeBtn);
      expect(mockClosePicker).toBeCalled();
    });

})