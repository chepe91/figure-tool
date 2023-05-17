import { fireEvent, render, screen } from '@testing-library/react';
import { FigureList } from '../app/components/FigureList/FigureList';
import { Shape } from '../app/components/Figure/constants';
import { within } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('Figure-List', () => {

    it('renders an add button', () => {
        render(<FigureList />)
        const addButton = screen.getByRole('button');
        expect(addButton).toBeEnabled();
    })

    it('opens the figure picker and closes it', () => {
        render(<FigureList />)
        const addButton = screen.getByRole('button');
        fireEvent.click(addButton);

        const closeButtonPicker = screen.getByRole('button', {
            name: /x/i
        });
        fireEvent.click(closeButtonPicker);
        expect(closeButtonPicker).not.toBeInTheDocument();
    })
    
    it('addds a circle into the list and delete it', async () => {
        render(<FigureList />)
        const addButton = screen.getByRole('button');
        fireEvent.click(addButton);

        let circle = screen.getByAltText(Shape.CIRCLE);
        fireEvent.click(circle);
        const addButtonPicker = screen.getByRole('button', {
            name: /add/i
        });
        fireEvent.click(addButtonPicker);

        let figures = screen.getAllByTestId('figure').map((figure) => ({
            img: within(figure).getByAltText(Shape.CIRCLE)
        }));
        expect(figures).toHaveLength(1);

        fireEvent.click(figures[0].img);

        const deleteBtn = screen.getByRole('button', {
            name: /delete/i
        });
        expect(deleteBtn).toBeInTheDocument();
        fireEvent.click(deleteBtn);

        figures = screen.queryAllByTestId('figure');
        expect(figures).toHaveLength(0);
    })

    it('addds a circle, square and triangle', async () => {
        render(<FigureList />)

        const addButton = screen.getByRole('button');
        fireEvent.click(addButton);

        let circle = screen.getByAltText(Shape.CIRCLE);
        fireEvent.click(circle);
        let addButtonPicker = screen.getByRole('button', {
            name: /add/i
        });
        fireEvent.click(addButtonPicker);

        let figures = screen.getAllByTestId('figure');
        expect(figures).toHaveLength(1);

        const first = within(figures[0]).getByAltText(Shape.CIRCLE);
        fireEvent.click(first);
        let addButtons = within(figures[0]).getAllByRole('button', {
            name: /\+/i
        });
        expect(addButtons).toHaveLength(2);
        
        fireEvent.click(addButtons[0]);
        let square = screen.getByAltText(Shape.SQUARE);
        fireEvent.click(square);
        addButtonPicker = screen.getByRole('button', {
            name: /add/i
        });
        fireEvent.click(addButtonPicker);

        figures = screen.getAllByTestId('figure');
        expect(figures).toHaveLength(2);
        
        const second = within(figures[1]).getByAltText(Shape.CIRCLE);
        fireEvent.click(second);

        addButtons = within(figures[1]).getAllByRole('button', {
            name: /\+/i
        });
        expect(addButtons).toHaveLength(2);
        fireEvent.click(addButtons[1]);
        let triangle = screen.getByAltText(Shape.TRIANGLE);
        fireEvent.click(triangle);
        addButtonPicker = screen.getByRole('button', {
            name: /add/i
        });
        fireEvent.click(addButtonPicker);
        figures = screen.getAllByTestId('figure').map((figure)=> {
            return within(figure).getByRole('img').alt
        });

        expect(figures).toEqual(["square", "circle", "triangle"]);
    })
})