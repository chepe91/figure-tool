
import Circle from "../../../public/circle.svg";
import Square from "../../../public//square.svg";
import Triangle from "../../../public/triangle.svg";

export enum Shape {
    CIRCLE = 'circle',
    SQUARE = 'square',
    TRIANGLE = 'triangle',
}

export const Shapes = {
    [Shape.CIRCLE]: Circle,
    [Shape.SQUARE]: Square,
    [Shape.TRIANGLE]: Triangle,
};