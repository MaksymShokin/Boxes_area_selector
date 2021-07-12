import cx from 'classnames';
import { MouseEvent } from 'react';

import classes from './box.module.css';

interface BoxProps {
  highlight: boolean;
  onMouseEnter: (event: MouseEvent) => void;
  onMouseDown: () => void;
}

export const Box = ({ highlight, onMouseDown, onMouseEnter }: BoxProps) => {
  return (
    <div
      className={cx(classes.box, {
        [classes.highlight]: highlight
      })}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
    />
  );
};
