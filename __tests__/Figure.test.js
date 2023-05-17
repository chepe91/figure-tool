import { render, screen } from '@testing-library/react';
import { Figure } from '../app/components/Figure/Figure';
import { Shape } from '../app/components/Figure/constants';
import '@testing-library/jest-dom';

describe('Figure', () => {

    it('renders a triangle', () => {
        render(<Figure shape={Shape.TRIANGLE}/>)
    
        const testImage = document.querySelector("img");
        expect(testImage.alt).toContain("triangle");
    })

    it('renders a circle', () => {
      render(<Figure shape={Shape.CIRCLE}/>)
  
      const testImage = document.querySelector("img");
      expect(testImage.alt).toContain("circle");
    })

    it('renders a square', () => {
      render(<Figure shape={Shape.SQUARE}/>)
  
      const testImage = document.querySelector("img");
      expect(testImage.alt).toContain("square");
    })

    it('adds a class when is selected', () => {
      render(<Figure shape={Shape.CIRCLE} isSelected={true} />)
  
      const testImage = document.querySelector("img");
      expect(testImage.className).toContain("selected");
    })

    it('fails with unknown shape', () => {
      render(<Figure shape={'rectangle'} isSelected={true} />)
  
      const testImage = document.querySelector("img");
      expect(testImage).toBeNull();
    })
})