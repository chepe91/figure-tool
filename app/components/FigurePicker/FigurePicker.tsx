"use client";

import { useState } from "react";
import { Figure } from "../Figure/Figure";
import { Shape } from "../Figure/constants";
import styles from "./FigurePicker.module.css";

interface FigurePickerProps {
    addFigure: (shape: Shape) => void,
    closePickerHandler: () => void,
}

export const FigurePicker = (props: FigurePickerProps) => {

    const [selectedShape, setSelectedShape] = useState<Shape>();

    const selectFigureHandler = (shape: Shape) => {
        setSelectedShape(shape);
    }

    const addFigureHandler = () => {
        if(selectedShape) 
            props.addFigure(selectedShape);
    }

    return <div className={styles.figurePicker}>
        <div className={styles.figurePickerContent}>
            <button className={styles.closeBtn} onClick={props.closePickerHandler}>X</button>
            <div className={styles.figures}>
                <Figure 
                    shape={Shape.CIRCLE} 
                    onClick={() => { selectFigureHandler(Shape.CIRCLE) }} 
                    isSelected={selectedShape === Shape.CIRCLE}
                />
                <Figure 
                    shape={Shape.SQUARE} 
                    onClick={() => { selectFigureHandler(Shape.SQUARE) }}
                    isSelected={selectedShape === Shape.SQUARE}
                />
                <Figure 
                    shape={Shape.TRIANGLE} 
                    onClick={() => { selectFigureHandler(Shape.TRIANGLE) }}
                    isSelected={selectedShape === Shape.TRIANGLE}
                />
            </div>
            <div className={styles.addBtnContainer}>
                <button 
                    onClick={addFigureHandler}
                    className={styles.addBtn}
                    disabled={selectedShape === undefined}>
                    Add
                </button>
            </div>
        </div>
    </div>;
}