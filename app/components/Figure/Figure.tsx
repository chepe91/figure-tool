import Image from 'next/image'
import { Shapes, Shape } from "./constants";
import styles from "./Figure.module.css";
import classNames from 'classnames';

interface FigureProps {
    shape: Shape,
    onClick?: () => void 
    isSelected?: boolean,
}

export const Figure = (data: FigureProps) => {
    const { shape, onClick, isSelected } = data;
    const figure = Shapes[shape];

    if( figure ) {
       return <Image
            src={figure}
            alt={shape}
            className={classNames({
                [styles.figure]: true,
                [styles.selected]: isSelected,
            })}
            onClick={onClick}
        />
    }

    return null;
}