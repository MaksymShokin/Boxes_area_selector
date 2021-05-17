import { MouseEvent, useCallback, useState } from 'react';

import { Box } from '../Box';
import classes from './boxesContainer.module.css';

interface BoxesContainerProps {
  rows?: number;
  columns?: number;
}

export const BoxesContainer = ({
  rows = 10,
  columns = 10
}: BoxesContainerProps) => {
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const [currentBoxes, setCurrentBoxes] = useState<number[]>([]);
  const [startIndex, setStartIndex] = useState<number | null>(null);

  const onMouseDown = useCallback(
    (event: MouseEvent, index: number) => {
      if (event.buttons < 1 || startIndex === null) {
        return;
      }

      const selectedIndexes = new Set<number>();
      const startRow = Math.floor(startIndex / columns);
      const startCol = startIndex % columns;
      const endRow = Math.floor(index / columns);
      const endCol = index % columns;

      const isRowsFlowPositive = startRow <= endRow;
      const isColumnsFlowPositive = startCol <= endCol;

      for (
        let i = startCol;
        isColumnsFlowPositive ? i <= endCol : i >= endCol;
        isColumnsFlowPositive ? i++ : i--
      ) {
        for (
          let j = startRow;
          isRowsFlowPositive ? j <= endRow : j >= endRow;
          isRowsFlowPositive ? j++ : j--
        ) {
          selectedIndexes.add(j * columns + i);
        }
      }

      setCurrentBoxes(Array.from(selectedIndexes));
    },
    [columns, startIndex]
  );

  const onMouseUpHandler = useCallback(() => {
    setSelectedBoxes(prevState => [...prevState, ...currentBoxes]);
    setCurrentBoxes([]);
  }, [currentBoxes]);

  const onMouseDownHandler = useCallback((index: number) => {
    setStartIndex(index);
    setSelectedBoxes(prevState => [...prevState, index]);
  }, []);

  return (
    <div className={classes.container}>
      <button className={classes.resetBtn} onClick={() => setSelectedBoxes([])}>
        Reset
      </button>
      <div className={classes.boxesContainer} style={{ width: columns * 30 }}>
        {Array.from({ length: rows * columns }, (_, i) => i).map(index => (
          <Box
            highlight={[...selectedBoxes, ...currentBoxes].includes(index)}
            key={index}
            onMouseEnter={event => onMouseDown(event, index)}
            onMouseDown={() => onMouseDownHandler(index)}
            onMouseUp={() => onMouseUpHandler()}
          />
        ))}
      </div>
    </div>
  );
};
