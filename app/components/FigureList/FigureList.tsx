"use client";

import { useState } from "react"
import { Figure } from "../Figure/Figure";
import { Shape } from "../Figure/constants";
import { FigurePicker } from "../FigurePicker/FigurePicker";
import styles from "./FigureList.module.css";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

export interface FigureData {
    shape: Shape
};

export const FigureList = () => {
    const [figures, setFigures] = useLocalStorage("figures", []);
    const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
    const [insertPosition, setInsertPosition] = useState<number>(0);
    const [selectedFigure, setSelectedFigure] = useState<number>();

    const addFigure = (shape: Shape) => {
        setFigures((arr: FigureData[]) => {
            arr.splice(insertPosition, 0, { shape });
            return arr;
        })
        setIsPickerVisible(false);
        setSelectedFigure(undefined);
    }

    const closePickerHandler = () => {
        setIsPickerVisible(false);
    }

    const showFigurePicker = (index: number) => {
        setInsertPosition(index);
        setIsPickerVisible(true);
    }

    const selectFigure = (index: number) => {
        setSelectedFigure(index);
    }

    const deleteFigure = (index: number) => {
        setFigures((arr: FigureData[]) => {
            return arr.filter((_, idx) => idx !== index);
        });
        setSelectedFigure(undefined);
    }

    return <div>
        <div className={styles.figureList}>
        {figures.length === 0 ? 
            <button className={styles.addBtn} onClick={()=> {showFigurePicker(0)}}>+</button> : 
            <>
                {figures.map((figure: FigureData, index: number)=> {
                    const isSelected = selectedFigure === index;
                    
                    return <div key={index} className={styles.figureContainer}>
                        {isSelected && <button onClick={()=> { deleteFigure(index) }} className={styles.deleteBtn}>Delete</button>}
                        <div className={styles.figure}>
                            {isSelected && <button className={styles.addBtn} onClick={()=> {showFigurePicker(index)}}>+</button>}
                            <Figure 
                                {...figure} 
                                onClick={()=> { selectFigure(index) }} 
                                isSelected={isSelected}
                            />
                            {isSelected && <button className={styles.addBtn} onClick={()=> {showFigurePicker(index+1)}}>+</button>}
                        </div>
                    </div>
                })}
            </>        
        }
        </div>
        {isPickerVisible && 
            <FigurePicker 
                addFigure={addFigure}
                closePickerHandler={closePickerHandler}
            />
        }
    </div>
}