import { useEffect, useState, useCallback } from 'react';
import Cell from './Cell';
import './styles.css';

const COLS_COUNT = 3;
const ROWS_COUNT = 3;
const initialPlayer = [0, 0];

const isSelected = (player, i, j) => {
  if (!player) return false;
  return i === player[0] && j === player[1];
};

const renderGrid = (playerA, playerB, isASelected) => {
  const grid = [];
  for (let i = 0; i < ROWS_COUNT; i++) {
    for (let j = 0; j < COLS_COUNT; j++) {
      const isPlayerASelected = isSelected(playerA, i, j);
      const isPlayerBSelected = isSelected(playerB, i, j);
      const cell = (
        <Cell
          key={`${i}-${j}`}
          isASelected={isPlayerASelected}
          isBSelected={isASelected && isPlayerBSelected}
        />
      );
      grid.push(cell);
    }
  }

  return grid;
};

const HeroGrid = ({ onSelect }) => {
  const [selectedPlayerA, setSelectedPlayerA] = useState(initialPlayer);
  const [selectedPlayerB, setSelectedPlayerB] = useState(initialPlayer);
  const [isPlayerASelected, setIsPlayerASelected] = useState(false);

  const handleKeyDown = useCallback(
    (event) => {
      const selected = !isPlayerASelected ? selectedPlayerA : selectedPlayerB;
      const selectFn = !isPlayerASelected ? setSelectedPlayerA : setSelectedPlayerB;
      if (event.key === 'Enter') {
        isPlayerASelected && onSelect();
        setIsPlayerASelected(true);
      }
      if (event.key === 'ArrowUp' && selected[0] > 0) {
        selectFn([selected[0] - 1, selected[1]]);
      } else if (event.key === 'ArrowDown' && selected[0] < ROWS_COUNT - 1) {
        selectFn([selected[0] + 1, selected[1]]);
      } else if (event.key === 'ArrowLeft' && selected[1] > 0) {
        selectFn([selected[0], selected[1] - 1]);
      } else if (event.key === 'ArrowRight' && selected[1] < COLS_COUNT - 1) {
        selectFn([selected[0], selected[1] + 1]);
      }
    },
    [selectedPlayerA, selectedPlayerB, isPlayerASelected, onSelect]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return <div className="grid">{renderGrid(selectedPlayerA, selectedPlayerB, isPlayerASelected)}</div>;
};

export default HeroGrid;
